import React, { useEffect, useState } from 'react';
import SubjectsData from '../../services/common/Subjects.Selector';
import { Subjects } from '../../interfaces/Subcjects.Interface';
import UiWhiteButtonLong from '../butons/UiWhiteBUttonLong';

const SubjectsComponent: React.FC = () => {
  const [subjectsData, setSubjectsData] = useState<Subjects[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const subjectsRes = await SubjectsData.getSubjects();
        setSubjectsData(subjectsRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  console.log('Subjects Data:', subjectsData);

  return (
    <>
      {subjectsData.map((subjectsData) => (
        <UiWhiteButtonLong
          key={subjectsData.id}
          subject={subjectsData.subject}
          colour={subjectsData.colour}
          icon={subjectsData.icon}
        />
      ))}
    </>
  );
};

export default SubjectsComponent;
