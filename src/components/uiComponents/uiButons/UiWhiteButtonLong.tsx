import React, {useEffect, useState} from 'react';
import {FaArrowRight} from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { DarkModeAtom } from '../../../atoms/DarkMode.Atom';
import { subjectIdAtom, subjectNameAtom } from '../../../atoms/Subject.Atom';
import supabase from '../../../config/SupabaseClient';

interface CustomButtonProps {
  subject: any;
  colour: any;
  icon: any;
  subjectId: any;
  CDNURL: string;
}

const UiWhiteButtonLong: React.FC<CustomButtonProps> = ({
  subject,
  colour,
  icon,
  subjectId,
  CDNURL,
}) => {
  const [isDarkMode, ] = useRecoilState(DarkModeAtom);
  const [, setImages] = useState<any[]>([]);
  const [selectedSubjectId,setSubjectId] = useRecoilState(subjectIdAtom);
  const [subjectName, setSubjectName] = useRecoilState(subjectNameAtom);
  const navigate = useNavigate();

  const handleOfferPage = () =>{
    setSubjectId(subjectId);
    setSubjectName(subject);
    navigate('/offers')
    console.log(selectedSubjectId);
    console.log(subjectName);
  }

  return (
    <button className={`border-2 border-black w-[80%] h-[50px] rounded-3xl mb-[8%] mx-auto my-auto flex items-center ${isDarkMode ? 'bg-[#2B2B2B]' : ''}`} onClick={handleOfferPage}>
      <div className='w-[10%] h-full ml-[15px]'>
        <div className='flex items-center justify-center w-full h-full overflow-hidden'>
          <img
            src={CDNURL + icon}
            alt={icon}
            className='w-[100%] h-auto'
          />
        </div>
      </div>
      <div
        style={{color: colour}}
        className='w-[80%] h-full text-center text-k2b font-bold text-[20px] pt-[7px]'>
        {subject}
      </div>
      <div className={`w-[10%] h-full flex justify-end items-center mr-[15px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <FaArrowRight />
      </div>
    </button>
  );
};

export default UiWhiteButtonLong;
