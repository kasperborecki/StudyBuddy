import supabase from '../../config/SupabaseClient';

const getSubjects = async () => {
  const { data, error } = await supabase
    .from('subjects')
    .select('id,subject, colour, icon_url');

  if (error) {
    console.error(error.message);
    throw error.message;
  }

  console.log(data);
  return data || [];
};

const getInputCities = async ({ inputValue }: { inputValue: string }) => {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('id, name')
      .ilike('name', `${inputValue}%`)
      .limit(10);

    if (error) {
      console.error(error.message);
      throw error.message;
    }

    console.log(data);
    return data || [];
  } catch (error: any) {
    console.error(error.message);
    throw error.message;
  }
};

const CommonData = {
  getSubjects,
  getInputCities,
};

export default CommonData;