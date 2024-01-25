import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import AddOfferButtonUnSelected from '../uiComponents/uiButons/AddOfferButtonUnSelected';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {MdKeyboardArrowUp} from 'react-icons/md';
import {addOfferMethod} from '../../atoms/AddOffer.Atom';
import AddOfferButtonSelected from '../uiComponents/uiButons/AddOfferButtonSelected';
import BreadCrumb from '../BreadCrumb';
import AddOfferNavigationButtons from '../uiComponents/uiButons/AddOffersNavigationButtons';
import {EducationMethod} from '../../constans/PersonalDataSettings.Constans';

const AddOfferThirdStep = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [method, setMethod] = useRecoilState(addOfferMethod);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleClearSubject = () => {
    setMethod('');
  };

  return (
    <div className='w-[80%]'>
      <BreadCrumb />
      <p
        className={`flex text-xl font-jua font-semibold text-black pb-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        Jaki <p className='text-[#D687F3] px-2'>Tryb</p> Preferujesz?
      </p>
      {method.length > 0 ? (
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
      <div>
        {isCollapsed === false ? (
          <div>
            {EducationMethod.map((option) => (
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

export default AddOfferThirdStep;
