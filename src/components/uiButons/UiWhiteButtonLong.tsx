import React, {useEffect, useState} from 'react';
import {FaArrowRight} from 'react-icons/fa';
import supabase from '../../config/SupabaseClient';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkModeAtom';

interface CustomButtonProps {
  subject: any;
  colour: any;
  icon: any;
}

const UiWhiteButtonLong: React.FC<CustomButtonProps> = ({
  subject,
  colour,
  icon,
}) => {
  const [isDarkMode, ] = useRecoilState(DarkModeAtom);
  const [, setImages] = useState<any[]>([]);

  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/subjectsicons/';

  async function getIcons() {
    try {
      const {data, error} = await supabase.storage.from('subjections').list();

      if (data) {
        setImages(data);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getIcons();
  }, []);

  return (
    <button className={`border-2 border-black w-[80%] h-[50px] rounded-3xl mb-[8%] mx-auto my-auto flex items-center ${isDarkMode ? 'bg-[#2B2B2B]' : ''}`}>
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
