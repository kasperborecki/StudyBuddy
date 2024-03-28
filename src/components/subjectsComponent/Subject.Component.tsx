import React, {useEffect, useState} from 'react';
import SubjectsData from '../../services/common/Common.Selector';
import {Subjects} from '../../interfaces/Subcjects.Interface';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import UISubjectButton from '../uiComponents/uiButons/UiSubjectsButton';
import {useRecoilState} from 'recoil';
import {studyFieldAtom} from '../../atoms/StudyField.Atom';

const SubjectsComponent: React.FC = () => {
  const [subjectsData, setSubjectsData] = useState<Subjects[]>([]);
  const [languagesData, setLanguagesData] = useState<Subjects[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [studyField] = useRecoilState(studyFieldAtom);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsLoading(true);
        const subjectsRes = await SubjectsData.getSubjects();
        setSubjectsData(subjectsRes || []); // Ensure it's an array
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLanguages = async () => {
      try {
        setIsLoading(true);
        const languagesRes = await SubjectsData.getLanguages();
        setLanguagesData(languagesRes || []); // Ensure it's an array
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
    fetchLanguages();
  }, []);

  const calculateAveragePrice = (offers: any[]) => {
    if (!offers || offers.length === 0) return 0;
    const prices = offers.map(offer => offer.price);
    const sum = prices.reduce((acc, curr) => acc + curr, 0);
    return sum / offers.length;
  };
  
  return (
    <>
      {isLoading ? (
        <LoadingSuspense />
      ) : (
        <div className='pb-2'>
          <div className='flex flex-wrap justify-center'>
            <div className='w-40 m-3 flex flex-col text-[18px] pt-2 text-[#303336] font-semibold'>
              <div className='flex flex-row'>
                <p>182</p>
                <p className='mx-2 font-bold text-[#7c4fc4]'>
                  <i>Korepetytorów</i>
                </p>
              </div>
              <p>dostępnych</p>
            </div>
            {studyField === 1 ? (
              <>
                {subjectsData.map((subjectData, index) => (
                  <UISubjectButton
                    index={index}
                    totalItems={subjectData.offers ? subjectData.offers.length : 0}
                    averagePrice={calculateAveragePrice(subjectData.offers || [])}
                    key={subjectData.id}
                    text={subjectData.subject}
                    colour={subjectData.colour}
                    icon={subjectData.icon_url}
                    subjectId={subjectData.id}
                    CDNURL={
                      'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/subjectsicons/'
                    }
                  />
                ))}
              </>
            ) : (
              <>
                {languagesData.map((languageData, index) => (
                  <UISubjectButton
                    index={index}
                    totalItems={languagesData.length} // Fixed typo, subjectsData -> languagesData
                    key={languageData.id}
                    text={languageData.subject}
                    colour={languageData.colour}
                    icon={languageData.icon_url}
                    subjectId={languageData.id}
                    CDNURL={
                      'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/subjectsicons/'
                    }
                    averagePrice={10}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectsComponent
