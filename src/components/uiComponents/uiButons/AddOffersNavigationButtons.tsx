import React from 'react';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../../atoms/DarkMode.Atom';
import { addOfferPageAtom } from '../../../atoms/AddOfferPage.Atom';

const AddOfferNavigationButtons = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [page, setPage] = useRecoilState(addOfferPageAtom);

  const buttonStyle = {
    base: 'border-2 w-[45%] h-[40px] rounded-3xl mb-[8%] mx-auto my-auto flex items-center',
    text: `w-full h-full text-center text-k2b font-bold text-[18px] py-[5px] ${
      isDarkMode ? 'text-white' : 'text-black'
    }`,
  };

  const handleBack = () => {
    setPage(page - 1);
    console.log(page);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div className='flex mb-32'>
        {page === 1 ? (<></>) :(
            <button
        className={`${buttonStyle.base} ${
          isDarkMode ? 'bg-[#2B2B2B] border-[#1a1a1a]' : 'bg-[#FFFFFF] border-[#dadada]'
        }`}
        onClick={handleBack}>
        <div className={buttonStyle.text}>Wróć</div>
      </button>
        )}
      <button
        className={`${buttonStyle.base} border-[#3e2e94] ${
          isDarkMode ? 'bg-[#b35ad3]' : 'bg-[#D687F3]'
        }`}
        onClick={handleNext}>
        <div className={buttonStyle.text}>Dalej</div>
      </button>
    </div>
  );
};

export default AddOfferNavigationButtons;
