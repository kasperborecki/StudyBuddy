import supabase from "../../config/SupabaseClient";

const getSelectedSubjectOffers = async (selectedSubject: string, isEducationLevel: string, isEducationType: string, isEducationMethod: string, isPrice: string) => {
  // const [isSortBy] = useRecoilState(sortBy);
  // const [isRating] = useRecoilState(DarkModeAtom);

  try {
    // Initial query to fetch offers data
    const { data: offersData, error: offersError } = await supabase
      .from('offers')
      .select('offer_id, created_at, subject_id, user_id, education_level, education_type, education_method, price')
      .eq('subject_id', selectedSubject)
      // .eq(isSortBy.length > 0 ? 'education_level' : '', sortBy)
      .eq(isEducationLevel.length > 0 ? 'education_level' : '', isEducationLevel)
      .eq(isEducationType.length > 0 ? 'education_type' : '', isEducationType)
      .eq(isEducationMethod.length > 0 ? 'education_method' : '', isEducationMethod)
      .lt(isPrice.length > 0 ? 'price' : '', isPrice)
      // .eq(rating.length > 0 ? 'education_level' : '', rating)

      
    if (offersError) {
      console.error(offersError.message);
      throw offersError.message;
    }

    if (!offersData || offersData.length === 0) {
      return [];
    }

    // Extract user IDs from offersData
    const userIds = offersData.map((offer) => offer.user_id);

    // Subsequent query to fetch profiles data based on user IDs
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id, name, surname, avatar_url')
      .in('user_id', userIds);

    if (profilesError) {
      console.error(profilesError.message);
      throw profilesError.message;
    }

    // Combine offersData with corresponding profilesData
    const combinedData = offersData.map((offer) => {
      const matchingProfile = profilesData.find((profile) => profile.user_id === offer.user_id);
      return {
        ...offer,
        // Use the spread operator to include profile fields if matching profile exists
        ...(matchingProfile && { profile: matchingProfile }),
      };
    });

    console.log(combinedData);
    return combinedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const OffersData = {
  getSelectedSubjectOffers,
};

export default OffersData;
