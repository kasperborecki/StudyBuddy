import supabase from '../../config/SupabaseClient';

const updateUserData = async (newData: any, userId: any) => {
  const {error} = await supabase
    .from('profiles')
    .update([
      {
        name: newData.name,
        surname: newData.surname,
        city: newData.city,
        email: newData.email,
        avatar_url: newData.avatar,
      },
    ])
    .eq('user_id', userId);
  if (error) throw error.message;
};

const getUserData = async (userId: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, name, surname, avatar_url, email, city, experience_years')
    .eq('user_id', userId);

    if (error) throw error.message;

    return data || [];
};

const UserData = {
  updateUserData,
  getUserData,
};

export default UserData;
