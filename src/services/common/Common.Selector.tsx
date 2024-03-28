import supabase from '../../config/SupabaseClient';
import { Subjects } from '../../interfaces/Subcjects.Interface';

const getSubjects = async (): Promise<Subjects[]> => {
  try {
    const { data: subjectsData, error: subjectsError } = await supabase
      .from('subjects')
      .select('id, subject, colour, icon_url, shadow')
      .lt('id', '10');

    if (subjectsError) {
      console.error(subjectsError.message);
      throw subjectsError.message;
    }

    if (!subjectsData || subjectsData.length === 0) {
      return [];
    }

    const subjectIds = subjectsData.map(subject => subject.id);

    const { data: offersData, error: offersError } = await supabase
      .from('offers')
      .select('offer_id, price, subject_id');

    if (offersError) {
      console.error(offersError.message);
      throw offersError.message;
    }

    const subjectsWithOffers = subjectsData.map(subject => {
      const matchingOffers = offersData.filter(offer => offer.subject_id === subject.id);
      return {
        ...subject,
        offers: matchingOffers, // Przypiszmy właściwe oferty do pola offers
      };
    });

    return subjectsWithOffers;
  } catch (error: any) {
    console.error(error.message);
    throw error.message;
  }
};


const getLanguages = async () => {
  const {data, error} = await supabase
    .from('subjects')
    .select('id,subject, colour, icon_url, shadow')
    .gt('id', '9');

  if (error) {
    console.error(error.message);
    throw error.message;
  }
  return data || [];
};

const getInputCities = async ({inputValue}: {inputValue: string}) => {
  try {
    const {data, error} = await supabase
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
