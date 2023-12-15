import supabase from '../../config/SupabaseClient';

const updateUserData = async (newData: any, userId: any) => {
  const {data, error} = await supabase
    .from('profiles')
    .update([
      {
        name: newData.name,
        surname: newData.surname,
        city: newData.city,
        education_level: newData.educationLevel,
        education_type: newData.educationType,
        education_method: newData.educationMethod,
        price: newData.price,
        description: newData.description,
      },
    ])
    .eq('user_id', userId);
    console.log(userId);
    console.log(data);
    console.log(newData);
  if (error) throw error.message;
};

const UserData = {
  updateUserData,
};

export default UserData;
