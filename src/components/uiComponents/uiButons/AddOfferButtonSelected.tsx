import React from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../../atoms/DarkMode.Atom';
import {
  addOfferMethod,
  addOfferSubject,
  addOfferType,
} from '../../../atoms/AddOffer.Atom';
import {RxCross2} from 'react-icons/rx';
import {addOfferPageAtom} from '../../../atoms/AddOfferPage.Atom';

const AddOfferButtonSelected = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [subject] = useRecoilState(addOfferSubject);
  const [type] = useRecoilState(addOfferType);
  const [method] = useRecoilState(addOfferMethod);
  const [page] = useRecoilState(addOfferPageAtom);
  let text = '';

  if (page === 1) {
    text = subject;
  } else if (page === 2) {
    text = type;
  } else if (page === 3) {
    text = method;
  }

  return (
    <button
      className={`w-full h-[50px] rounded-3xl mb-[8%] mx-auto my-auto flex
        ${
          isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#FF6969] border-2 border-[#ff4f4f]'
        }`}>
      <div
        className={`w-11/12 text-start text-k2b font-bold text-[18px] pt-[12px] pl-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        {text}
      </div>
      <div className='text-end font-bold text-[18px] pt-[14px] pr-6 text-black'>
        <RxCross2 />
      </div>
    </button>
  );
};

export default AddOfferButtonSelected;
