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
        setSubjectsData(subjectsRes);
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
        setLanguagesData(languagesRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
    fetchLanguages();
  }, []);
  console.log(subjectsData);
  return (
    <>
      {isLoading ? (
        <LoadingSuspense />
      ) : (
        <div className='pb-24'>
          <div className='flex flex-wrap justify-center'>
            <p className='w-40 m-3'>essa</p>
            {studyField === 1 ? (
              <>
                {subjectsData.map((subjectData, index) => (
                  <UISubjectButton
                    index={index}
                    totalItems={subjectsData.length}
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
                    totalItems={subjectsData.length}
                    key={languageData.id}
                    text={languageData.subject}
                    colour={languageData.colour}
                    icon={languageData.icon_url}
                    subjectId={languageData.id}
                    CDNURL={
                      'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/subjectsicons/'
                    }
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

export default SubjectsComponent;
