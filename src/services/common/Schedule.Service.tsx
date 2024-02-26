import supabase from "../../config/SupabaseClient";

const getScheduleData = async (ownerId: string, chosenDay: string) => {
  const { data, error } = await supabase
    .from("offer_requests")
    .select(
      "request_id, offer_id, participant_id, month, week_day, hour, message, created_at, owner_id"
    )
    .eq("owner_id", ownerId)
    .eq("week_day", chosenDay);

  if (error) throw error.message;

  return data || null;
};

const ScheduleData = {
    getScheduleData,
};

export default ScheduleData;
