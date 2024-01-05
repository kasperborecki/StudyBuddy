import supabase from '../../config/SupabaseClient';

const getSubjects = async () => {
  const { data, error } = await supabase
    .from('subjects')
    .select('id,subject, colour, icon_url')
    .lt('id', '9');

  if (error) {
    console.error(error.message);
    throw error.message;
  }
  return data || [];
};

const getLanguages = async () => {
  const { data, error } = await supabase
    .from('subjects')
    .select('id,subject, colour, icon_url')
    .gt('id', '8');

  if (error) {
    console.error(error.message);
    throw error.message;
  }
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
    return data || [];
  } catch (error: any) {
    console.error(error.message);
    throw error.message;
  }
};

const CommonData = {
  getSubjects,
  getInputCities,
  getLanguages,
};

export default CommonData;