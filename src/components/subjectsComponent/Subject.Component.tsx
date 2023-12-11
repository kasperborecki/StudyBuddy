import React, { useEffect, useState } from 'react';
import SubjectsData from '../../services/common/Subjects.Selector';
import { Subjects } from '../../interfaces/Subcjects.Interface';
import UiWhiteButtonLong from '../butons/UiWhiteBUttonLong';

const SubjectsComponent: React.FC = () => {
  const [subjectsData, setSubjectsData] = useState<Subjects[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsRes = await SubjectsData.getSubjects();
        setSubjectsData(subjectsRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className='pb-24'>
      {subjectsData.map((subjectsData) => (
        <UiWhiteButtonLong
          key={subjectsData.id}
          subject={subjectsData.subject}
          colour={subjectsData.colour}
          icon={subjectsData.icon_url}
        />
      ))}
    </div>
  );
};

export default SubjectsComponent;
