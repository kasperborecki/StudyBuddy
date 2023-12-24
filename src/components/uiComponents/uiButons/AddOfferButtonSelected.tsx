import React from 'react';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../../atoms/DarkMode.Atom';
import { addOfferSubject } from '../../../atoms/AddOffer.Atom';
import { RxCross2 } from "react-icons/rx";


const AddOfferButtonSelected = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [subject,] = useRecoilState(addOfferSubject);


  return (
    <button
      className={`w-full h-[50px] rounded-3xl mb-[8%] mx-auto my-auto flex
        ${isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#eb5e5e]'}`}>
      <div
        className={`w-11/12 text-start text-k2b font-bold text-[18px] pt-[12px] pl-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {subject}
      </div>
      <div className='text-end font-bold text-[18px] pt-[14px] pr-6'>
        <RxCross2 />
      </div>
    </button>
  );
};

export default AddOfferButtonSelected;
