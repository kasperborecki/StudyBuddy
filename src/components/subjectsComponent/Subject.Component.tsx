import React, {useEffect, useState} from 'react';
import SubjectsData from '../../services/common/Subjects.Selector';
import {Subjects} from '../../interfaces/Subcjects.Interface';
import UiWhiteButtonLong from '../uiButons/UiWhiteButtonLong';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';

const SubjectsComponent: React.FC = () => {
  const [subjectsData, setSubjectsData] = useState<Subjects[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    fetchSubjects();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSuspense />
      ) : (
        <div className='pb-24'>
          {subjectsData.map((subjectData) => (
            <UiWhiteButtonLong
              key={subjectData.id}
              subject={subjectData.subject}
              colour={subjectData.colour}
              icon={subjectData.icon_url}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SubjectsComponent;
