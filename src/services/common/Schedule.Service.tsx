import supabase from "../../config/SupabaseClient";

const getScheduleData = async (ownerId: string, chosenDay: string) => {
  try {
    const { data: scheduleData, error: scheduleError } = await supabase
      .from("offer_requests")
      .select(
        "request_id, offer_id, participant_id, month, week_day, hour, topic, created_at, owner_id"
      )
      .eq("owner_id", ownerId)
      .eq("week_day", chosenDay);

    if (scheduleError) {
      console.error(scheduleError.message);
      throw scheduleError.message;
    }

    if (!scheduleData || scheduleData.length === 0) {
      return [];
    }

    const participantId = scheduleData.map(schedule => schedule.participant_id);

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select('user_id, name, avatar_url, experience_years, experience_info, verificated')
      .in('user_id', participantId);

    if (profilesError) {
      console.error(profilesError.message);
      throw profilesError.message;
    }

    const combinedData = scheduleData.map(schedule => {
      const matchingProfile = profilesData.find(profile => profile.user_id === schedule.participant_id);
      return {
        ...schedule,
        ...(matchingProfile && { participantInfo: matchingProfile }),
      };
    });

    return combinedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const ScheduleData = {
  getScheduleData,
};

export default ScheduleData;
