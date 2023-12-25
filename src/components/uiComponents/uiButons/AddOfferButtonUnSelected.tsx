import React from 'react';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../../atoms/DarkMode.Atom';
import { FaRegSquarePlus } from "react-icons/fa6";
import { addOfferCiteis, addOfferCiteisId, addOfferLevel, addOfferMethod, addOfferSubject, addOfferType } from '../../../atoms/AddOffer.Atom';
import { addOfferPageAtom } from '../../../atoms/AddOfferPage.Atom';


interface CustomButtonProps {
  text?: any;
  citiId?: any
}

const AddOfferButtonUnSelected: React.FC<CustomButtonProps> = ({
  text,
  citiId,
}) => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [,setSubject] = useRecoilState(addOfferSubject);
  const [,setType] = useRecoilState(addOfferType);
  const [,setMethod] = useRecoilState(addOfferMethod);
  const [,setLevel] = useRecoilState(addOfferLevel);
  const [citeis,setCities] = useRecoilState(addOfferCiteis);
  const [iscitiId ,setCitiesId] = useRecoilState(addOfferCiteisId);
  const [page] = useRecoilState(addOfferPageAtom);


  const handleSelect = () => {
    if(page === 1){
    setSubject(text);
    } else if( page === 2 ){
      setType(text);
    } else if( page === 3 ){
      setMethod(text);
    } else if( page === 4 ){
      setLevel(text);
    } else if( page === 5 ){
      setCities(text);
      setCitiesId(citiId);
    }
  } 

  return (
    <button
      className={`w-full h-[50px] rounded-3xl mb-[8%] mx-auto my-auto flex
        ${isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#eaeaea]'}`}
        onClick={handleSelect}>
      <div
        className={`w-11/12 text-start text-k2b font-bold text-[18px] pt-[12px] pl-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {text}
      </div>
      <div className='text-end font-bold text-[18px] pt-[14px] pr-6'>
        <FaRegSquarePlus />
      </div>
    </button>
  );
};

export default AddOfferButtonUnSelected;