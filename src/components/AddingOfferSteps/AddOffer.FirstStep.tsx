import {useEffect, useState} from 'react';
import SubjectsData from '../../services/common/Subjects.Selector';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import {Subjects} from '../../interfaces/Subcjects.Interface';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import AddOfferButtonUnSelected from '../uiComponents/uiButons/AddOfferButtonUnSelected';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {MdKeyboardArrowUp} from 'react-icons/md';
import {addOfferSubject} from '../../atoms/AddOffer.Atom';
import AddOfferButtonSelected from '../uiComponents/uiButons/AddOfferButtonSelected';
import BreadCrumb from '../BreadCrumb';
import AddOfferNavigationButtons from '../uiComponents/uiButons/AddOffersNavigationButtons';

const AddOfferFirstStep = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjectsData, setSubjectsData] = useState<Subjects[]>([]);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [subject, setSubject] = useRecoilState(addOfferSubject);

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

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleClearSubject = () => {
    setSubject('');
    console.log('essa');
  };

  return (
    <div>
      <BreadCrumb />
      <p className='flex text-2xl font-jua font-semibold text-black pb-8'>
        Jakiego <p className='text-[#D687F3] px-2'>Przedmiotu</p> Uczysz?
      </p>
      {subject.length > 0 ? <button className='w-full' onClick={handleClearSubject}><AddOfferButtonSelected /></button> : <></>}
      <div
        className='flex w-64 mb-8'
        onClick={handleCollapse}>
        <div className='relative my-2 border-t-2 mt-3 border-gray-600 w-full' />
        {isCollapsed ? (
          <>
            <p className='absolute text-gray-700 text-[15px] font-bold right-16'>
              Rozwiń
            </p>
            <div className='absolute right-10 text-[22px]'>
                <MdKeyboardArrowDown />
            </div>
          </>
        ) : (
          <>
            <p className='absolute text-gray-700 text-[15px] font-bold right-20'>
              Zwiń
            </p>
            <div className='absolute right-12 text-[22px]'>
              <MdKeyboardArrowUp />
            </div>
          </>
        )}
      </div>

      {isLoading ? (
        <div className='ml-20'>
        <LoadingSuspense />
        </div>
      ) : (
        <div>
          {isCollapsed == false ? (
            <div>
              {subjectsData.map((subjectData) => (
                <AddOfferButtonUnSelected text={subjectData.subject} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
      <AddOfferNavigationButtons />
    </div>
  );
};

export default AddOfferFirstStep;
