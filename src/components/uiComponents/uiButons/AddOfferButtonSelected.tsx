import React from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../../atoms/DarkMode.Atom';
import {
  addOfferCiteis,
  addOfferCiteisId,
  addOfferLevel,
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
  const [level] = useRecoilState(addOfferLevel);
  const [cities] = useRecoilState(addOfferCiteis);
  const [page] = useRecoilState(addOfferPageAtom);
  let text = '';

  if (page === 1) {
    text = subject;
  } else if (page === 2) {
    text = type;
  } else if (page === 3) {
    text = method;
  } else if (page === 4) {
    text = level;
  } else if (page === 5) {
    text = cities;
  }
  console.log(cities);

  return (
    <button
      className='w-full h-[50px] rounded-3xl mb-[8%] mx-auto my-auto flex bg-[#b35ad3] border-2 border-[#3e2e94]'>
      <div
        className={`w-11/12 text-start text-k2b font-bold text-[18px] pt-[10px] pl-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        {text}
      </div>
      <div className={`text-end font-bold text-[18px] pt-[14px] pr-6 text-black${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        <RxCross2 />
      </div>
    </button>
  );
};

export default AddOfferButtonSelected;
