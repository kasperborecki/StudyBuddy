import supabase from '../../config/SupabaseClient';

// Get Offers From Selected Subject With Or Without Filtering

const getSelectedSubjectOffers = async (
  selectedSubject: string,
  isEducationLevel: string,
  isEducationType: string,
  isEducationMethod: string,
  isPrice: string,
) => {
  // const [isSortBy] = useRecoilState(sortBy);
  // const [isRating] = useRecoilState(DarkModeAtom);

  try {
    // Initial query to fetch offers data
    const {data: offersData, error: offersError} = await supabase
      .from('offers')
      .select(
        'offer_id, created_at, subject_id, user_id, education_level, education_method, price, time, city, description',
      )
      .eq('subject_id', selectedSubject)
      // .eq(isSortBy.length > 0 ? 'education_level' : '', sortBy)
      .eq(
        isEducationLevel.length > 0 ? 'education_level' : '',
        isEducationLevel,
      )
      .eq(isEducationType.length > 0 ? 'education_type' : '', isEducationType)
      .eq(
        isEducationMethod.length > 0 ? 'education_method' : '',
        isEducationMethod,
      )
      .lt(isPrice.length > 0 ? 'price' : '', isPrice);
    // .eq(rating.length > 0 ? 'education_level' : '', rating)

    if (offersError) {
      console.error(offersError.message);
      throw offersError.message;
    }

    if (!offersData || offersData.length === 0) {
      return [];
    }

    const userIds = offersData.map((offer) => offer.user_id);

    const {data: profilesData, error: profilesError} = await supabase
      .from('profiles')
      .select(
        'user_id, nickName, avatar_url, experience_years, experience_info, verificated',
      )
      .in('user_id', userIds);

    if (profilesError) {
      console.error(profilesError.message);
      throw profilesError.message;
    }

    const combinedData = offersData.map((offer) => {
      const matchingProfile = profilesData.find(
        (profile) => profile.user_id === offer.user_id,
      );
      return {
        ...offer,
        ...(matchingProfile && {profile: matchingProfile}),
      };
    });

    return combinedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get Selected Offer By Id

const getOffer = async (selectedOfferId: any) => {
  try {
    // Initial query to fetch offers data
    const {data: offersData, error: offersError} = await supabase
      .from('offers')
      .select(
        'offer_id, created_at, subject_id, user_id, education_level, education_method, price, time, city, description',
      )
      .in('offer_id', [selectedOfferId]);

    if (offersError) {
      console.error(offersError.message);
      throw offersError.message;
    }

    if (!offersData || offersData.length === 0) {
      return [];
    }

    const userIds = offersData.map((offer) => offer.user_id);

    const {data: profilesData, error: profilesError} = await supabase
      .from('profiles')
      .select(
        'user_id, nickName, avatar_url, experience_years, experience_info, verificated',
      )
      .in('user_id', userIds);

    if (profilesError) {
      console.error(profilesError.message);
      throw profilesError.message;
    }

    const combinedData = offersData.map((offer) => {
      const matchingProfile = profilesData.find(
        (profile) => profile.user_id === offer.user_id,
      );
      return {
        ...offer,
        ...(matchingProfile && {profile: matchingProfile}),
      };
    });

    return combinedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Add New Offer

const addNewOffer = async (
  userId: string,
  subjectId: string,
  time: number,
  price: number,
  cityId: number,
  level: string,
  method: string,
  description: string,
  avability: (string | boolean)[][],
) => {
  let i = 0;
  try {
    const {data: addOfferData, error: addOfferError} = await supabase
      .from('offers')
      .insert([
        {
          subject_id: subjectId,
          user_id: userId,
          time: time,
          price: price,
          city: cityId,
          education_level: level,
          education_method: method,
          description: description,
        },
      ])
      .select('offer_id');
    if (addOfferError) throw addOfferError.message;

    do {
      const {error} = await supabase.from('availability').insert([
        {
          day: avability[i][0],
          eight: avability[i][1],
          nine: avability[i][2],
          ten: avability[i][3],
          eleven: avability[i][4],
          twelve: avability[i][5],
          thirteen: avability[i][6],
          fourteen: avability[i][7],
          fifteen: avability[i][8],
          sixteen: avability[i][9],
          seventeen: avability[i][10],
          eighteen: avability[i][11],
          nineteen: avability[i][12],
          twenty: avability[i][13],
          twentyOne: avability[i][14],
          twentyTwo: avability[i][15],
          offer_id: addOfferData[0]?.offer_id,
        },
      ]);
      if (error) throw error.message;

      i = i + 1;
    } while (i < 7);
  } catch (error) {
    console.error('Exception in addNewOffer:', error);
    throw error;
  }
};

// Get Availability Of Offer

const getAvailability = async (selectedOfferId: any) => {
  const { data, error } = await supabase
    .from('availability')
    .select('*')
    .eq('offer_id', selectedOfferId);

  if (error) throw error.message;

  console.log(data);
  return data || [];
};


const OffersData = {
  getSelectedSubjectOffers,
  getOffer,
  addNewOffer,
  getAvailability,
};

export default OffersData;
