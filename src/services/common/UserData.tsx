import supabase from "../../config/SupabaseClient";

const completeUserData = async (formData: string) => {
const { error } = await supabase
  .from('profiles')
  .insert([
    { 
      name: FormData.name, 
      // surname: FormData.surname, 
      // city: FormData.city, 
      // birth_date: FormData.birthDate, 
    },
  ])
  // .eq(email, )
  if (error) throw error.message;
};

const UserData = {
  completeUserData,
}

export default UserData