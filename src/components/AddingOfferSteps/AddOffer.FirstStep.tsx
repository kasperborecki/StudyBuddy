import {useEffect, useState} from 'react';
import SubjectsData from '../../services/common/Common.Selector';
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
  };

  return (
    <div className='w-[80%]'>
      <BreadCrumb />
      <p
        className={`flex text-xl font-jua font-semibold text-black pb-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        Jakiego <p className='text-[#D687F3] px-2'>Przedmiotu</p> Uczysz?
      </p>
      {subject.length > 0 ? (
        <button
          className='w-full'
          onClick={handleClearSubject}>
          <AddOfferButtonSelected />
        </button>
      ) : (
        <></>
      )}
      <div
        className='flex w-64 mb-8'
        onClick={handleCollapse}>
        <div className='relative my-2 border-t-2 mt-3 border-gray-600 w-full' />
        {isCollapsed ? (
          <>
            <p
              className={`absolute text-gray-700 text-[15px] font-bold pl-2 right-16 ${
                isDarkMode
                  ? 'text-white bg-[#212121]'
                  : 'text-black bg-[#FAEFFF]'
              }`}>
              Rozwiń
            </p>
            <div
              className={`absolute right-10 text-[22px] ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              <MdKeyboardArrowDown />
            </div>
          </>
        ) : (
          <>
            <p
              className={`absolute text-gray-700 text-[15px] font-bold px-2 right-12 ${
                isDarkMode
                  ? 'text-white bg-[#212121]'
                  : 'text-black bg-[#FAEFFF]'
              }`}>
              Zwiń
            </p>
            <div
              className={`absolute right-8 text-[22px] ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
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
          {isCollapsed === false ? (
            <div>
              {subjectsData.map((subjectData) => (
                <AddOfferButtonUnSelected text={subjectData.subject} id={subjectData.id} />
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
