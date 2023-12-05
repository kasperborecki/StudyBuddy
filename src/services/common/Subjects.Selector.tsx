import supabase from '../../config/SupabaseClient';
import { Subjects } from '../../interfaces/Subcjects.Interface';

const getSubjects = async () => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*');

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