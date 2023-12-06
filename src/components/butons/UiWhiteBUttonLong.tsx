import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import IconsSelector from '../iconsSelector/IconsSelector';

interface CustomButtonProps {
  subject: any;
  colour: any;
  icon: any;
}

const UiWhiteButtonLong: React.FC<CustomButtonProps> = ({ subject, colour, icon }) => {
  console.log('Button Icon:', icon);

  return (
    <button className={`border-2 border-black w-[80%] h-[50px] rounded-3xl mb-[8%] flex items-center`}>
      <div className='w-[10%] h-full pt-[8px] ml-[15px]'>
        <IconsSelector icon={icon} />
      </div>
      <div style={{ color: colour }} className='w-[80%] h-full text-center text-k2b font-bold text-[20px] pt-[7px]'>
        {subject}
      </div>
      <div className='w-[10%] h-full flex justify-end items-center mr-[15px]'>
        <FaArrowRight />
      </div>
    </button>
  );
};

export default UiWhiteButtonLong;
