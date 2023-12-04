import supabase from "../../config/SupabaseClient";

const completeUserData = async (newData: any, registeredUser:string ) => {
const { error } = await supabase
  .from('profiles')
  .insert([
    { 
      name: newData.name, 
      surname: newData.surname, 
      city: newData.city, 
      birth_date: newData.birthDate, 
    },
  ])
  .eq('email', registeredUser)
  if (error) throw error.message;
};

const UserData = {
  completeUserData,
}

export default UserData