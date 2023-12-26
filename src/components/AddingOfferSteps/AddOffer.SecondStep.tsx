import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import AddOfferButtonUnSelected from '../uiComponents/uiButons/AddOfferButtonUnSelected';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {MdKeyboardArrowUp} from 'react-icons/md';
import {addOfferType} from '../../atoms/AddOffer.Atom';
import AddOfferButtonSelected from '../uiComponents/uiButons/AddOfferButtonSelected';
import BreadCrumb from '../BreadCrumb';
import AddOfferNavigationButtons from '../uiComponents/uiButons/AddOffersNavigationButtons';
import {EducationType} from '../../constans/PersonalDataSettings.Constans';

const AddOfferSecondStep = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [type, setType] = useRecoilState(addOfferType);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleClearSubject = () => {
    setType('');
  };

  return (
    <div className='w-[80%]'>
      <BreadCrumb />
      <p
        className={`flex text-xl font-jua font-semibold text-black pb-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        Jaki <p className='text-[#D687F3] px-2'>Typ</p> Zajęć Preferujesz?
      </p>
      {type.length > 0 ? (
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
              className={`absolute text-gray-700 text-[15px] font-bold px-2 right-16 ${
                isDarkMode
                  ? 'text-white bg-[#212121]'
                  : 'text-black bg-[#FAEFFF]'
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
            {EducationType.map((option) => (
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

export default AddOfferSecondStep;
