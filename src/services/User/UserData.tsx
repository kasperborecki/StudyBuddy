import supabase from '../../config/SupabaseClient';

const updateUserData = async (newData: any, userId: any) => {
  const {data, error} = await supabase
    .from('profiles')
    .update([
      {
        nickName: newData.nickName,
        city: newData.city,
        // education_level: newData.educationLevel,
        // education_type: newData.educationType,
        // education_method: newData.educationMethod,
        // price: newData.price,
        description: newData.description,
      },
    ])
    .eq('user_id', userId);
  if (error) throw error.message;
};

const getUserData = async (userId: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, nickName, avatar_url, experience')
    .eq('user_id', userId);

    if (error) throw error.message;

    return data || [];
};

const UserData = {
  updateUserData,
  getUserData,
};

export default UserData;
