import supabase from "../../config/SupabaseClient";

// get all coments and gerades

const getAllComments = async (offerId: string) => {
    try {
      const { data: CommentData, error: CommentError } = await supabase
        .from("offer_opinions")
        .select(
          "comment_id, offer_id, user_id, rating, comment, created_at"
        )
        .eq("offer_id", offerId)
        .limit(5);
  
      if (CommentError) throw CommentError.message;
  
      if (!CommentData || CommentData.length === 0) {
        return [];
      }
  
      const userIds = CommentData.map((comments) => comments.user_id);
  
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(
          'user_id, name, surname, avatar_url, experience_years, experience_info, verificated, city',
        )
        .in('user_id', userIds);
  
      if (profilesError) {
        console.error(profilesError.message);
        throw profilesError.message;
      }
  
      const combinedData = CommentData.map((comment) => {
        const matchingProfile = profilesData.find(
          (profile) => profile.user_id === comment.user_id,
        );
        return {
          ...comment,
          profile: matchingProfile || undefined,
        };
      });
  
      return combinedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

// get all one star comments

const getAllOneStar = async (offerId: string) => {
    const { data, error } = await supabase
      .from("offer_opinions")
      .select('rating')
      .eq("offer_id", offerId)
      .eq("rating", 1);
  
    if (error) throw error.message;
  
    return data || 0;
  };

// get all two star comments

const getAllTwoStar = async (offerId: string) => {
    const { data, error } = await supabase
      .from("offer_opinions")
      .select('rating')
      .eq("offer_id", offerId)
      .eq("rating", 2);
  
    if (error) throw error.message;
  
    return data || null;
  };

// get all three star comments

const getAllThreeStar = async (offerId: string) => {
    const { data, error } = await supabase
      .from("offer_opinions")
      .select('rating')
      .eq("offer_id", offerId)
      .eq("rating", 3);
  
    if (error) throw error.message;
  
    return data || null;
  };

// get all four star comments

const getAllFourStar = async (offerId: string) => {
    const { data, error } = await supabase
      .from("offer_opinions")
      .select('rating')
      .eq("offer_id", offerId)
      .eq("rating", 4);
  
    if (error) throw error.message;
  
    return data || null;
  };

// get all five star comments

const getAllFiveStar = async (offerId: string) => {
    const { data, error } = await supabase
      .from("offer_opinions")
      .select('rating')
      .eq("offer_id", offerId)
      .eq("rating", 5);
  
    if (error) throw error.message;
  
    return data || null;
  };

const getAllStar = async (offerId: string) => {
    const { data, error } = await supabase
      .from("offer_opinions")
      .select('rating')
      .eq("offer_id", offerId);
  
    if (error) throw error.message;
  
    return data || null;
  };

const OfferOpinionsService = {
    getAllComments,
    getAllOneStar,
    getAllTwoStar,
    getAllThreeStar,
    getAllFourStar,
    getAllFiveStar,
    getAllStar,
};

export default OfferOpinionsService;
