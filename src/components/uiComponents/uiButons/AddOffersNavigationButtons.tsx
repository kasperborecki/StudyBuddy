import React from 'react';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../../atoms/DarkMode.Atom';
import { addOfferPageAtom } from '../../../atoms/AddOfferPage.Atom';
import { addOfferCiteis, addOfferDescription, addOfferLevel, addOfferMethod, addOfferPrice, addOfferSubject, addOfferTime, addOfferType } from '../../../atoms/AddOffer.Atom';

const AddOfferNavigationButtons = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [page, setPage] = useRecoilState(addOfferPageAtom);
  const [subject] = useRecoilState(addOfferSubject);
  const [type] = useRecoilState(addOfferType);
  const [time] = useRecoilState(addOfferTime);
  const [price] = useRecoilState(addOfferPrice);
  const [cities] = useRecoilState(addOfferCiteis);
  const [level] = useRecoilState(addOfferLevel);
  const [method] = useRecoilState(addOfferMethod);
  const [description] = useRecoilState(addOfferDescription)

  let enabled = false;

  const buttonStyle = {
    base: 'border-2 w-[45%] h-[40px] rounded-3xl mb-[8%] mx-auto my-auto flex items-center',
    baseDisabled: 'border-2 w-[45%] h-[40px] opacity-50 rounded-3xl mb-[8%] mx-auto my-auto flex items-center',
    text: `w-full h-full text-center text-k2b font-bold text-[18px] py-[5px] ${
      isDarkMode ? 'text-white' : 'text-black'
    }`,
    textDisabled: `w-full h-full text-center text-k2b opacity-50 font-bold text-[18px] py-[5px] ${
      isDarkMode ? 'text-white' : 'text-black'
    }`,
  };

  const handleBack = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  // Checking conditions for enabling the "Next" button
  switch (page) {
    case 1:
      enabled = subject.length > 1;
      break;
    case 2:
      enabled = type.length > 1;
      break;
    case 3:
      enabled = method.length > 1;
      break;
    case 4:
      enabled = level.length > 1;
      break;
    case 5:
      enabled = cities.length > 1;
      break;
    case 6:
      enabled = time > 1;
      break;
    case 7:
      enabled = price > 1;
      break;
    case 8:
      enabled = description.length > 200;
      break
    default:
      enabled = false;
  }

  return (
    <div className='flex mb-32'>
      {page === 1 ? (
        <></>
      ) : (
        <button
          className={`${buttonStyle.base} ${
            isDarkMode ? 'bg-[#2B2B2B] border-[#1a1a1a]' : 'bg-[#FFFFFF] border-[#dadada]'
          }`}
          onClick={handleBack}>
          <div className={buttonStyle.text}>Wróć</div>
        </button>
      )}
      <button
        className={`${enabled ? buttonStyle.base : buttonStyle.baseDisabled} border-[#3e2e94] ${
          isDarkMode ? 'bg-[#b35ad3]' : 'bg-[#D687F3]'
        }`}
        disabled={!enabled}
        onClick={handleNext}>
        <div className={enabled ? buttonStyle.text : buttonStyle.textDisabled}>Dalej</div>
      </button>
    </div>
  );
};

export default AddOfferNavigationButtons;
