import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../../atoms/DarkMode.Atom';

interface CustomButtonProps {
  text?: any;
  colour?: any;
}

const UiWhiteButtonFilters: React.FC<CustomButtonProps> = ({
  text,
  colour,
}) => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);

  return (
    <button
      className={`border-2 border-black w-[80%] h-[50px] rounded-3xl mb-[8%] mx-auto my-auto flex items-center ${
        isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#FFFFFF]'
      }`}
      style={{ backgroundColor: colour }}>
      <div
        className='w-full h-full text-center text-k2b font-bold text-[20px] pt-[7px]'>
        {text}
      </div>
    </button>
  );
};

export default UiWhiteButtonFilters;
