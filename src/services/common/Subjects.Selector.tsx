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

const SubjectsData = {
  getSubjects,
};

export default SubjectsData;