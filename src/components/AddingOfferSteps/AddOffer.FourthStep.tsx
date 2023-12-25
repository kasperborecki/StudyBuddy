import {useEffect, useState} from 'react';
import SubjectsData from '../../services/common/Common.Selector';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import {Subjects} from '../../interfaces/Subcjects.Interface';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import AddOfferButtonUnSelected from '../uiComponents/uiButons/AddOfferButtonUnSelected';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {MdKeyboardArrowUp} from 'react-icons/md';
import {addOfferLevel} from '../../atoms/AddOffer.Atom';
import AddOfferButtonSelected from '../uiComponents/uiButons/AddOfferButtonSelected';
import BreadCrumb from '../BreadCrumb';
import AddOfferNavigationButtons from '../uiComponents/uiButons/AddOffersNavigationButtons';
import {EducationLevel} from '../../constans/PersonalDataSettings.Constans';

const AddOfferFourthStep = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [level, setLevel] = useRecoilState(addOfferLevel);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleClearSubject = () => {
    setLevel('');
  };

  return (
    <div className='w-[80%]'>
      <BreadCrumb />
      <p
        className={`flex text-2xl font-jua font-semibold text-black pb-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        Na Jakim <p className='text-[#D687F3] px-2'>Poziomie</p> Uczysz?
      </p>
      {level.length > 0 ? (
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
              className={`absolute text-gray-700 text-[15px] font-bold right-16 ${
                isDarkMode ? 'text-white' : 'text-black'
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
              className={`absolute text-gray-700 text-[15px] font-bold right-20 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              Zwiń
            </p>
            <div
              className={`absolute right-12 text-[22px] ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              <MdKeyboardArrowUp />
            </div>
          </>
        )}
      </div>
      <div>
        {isCollapsed === false ? (
          <div>
            {EducationLevel.map((option) => (
              <AddOfferButtonUnSelected text={option.name} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <AddOfferNavigationButtons />
    </div>
  );
};

export default AddOfferFourthStep;
