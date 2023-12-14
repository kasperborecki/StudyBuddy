import React from 'react';
import { useNavigate } from 'react-router';

interface CustomButtonProps {
  text: string;
  push: string;
}

const UiGradienButtonLong: React.FC<CustomButtonProps> = ({ text, push }) => {
  const navigate = useNavigate();

  const handlePush = () => {
    navigate(push);
  };
  
  return (
    <button className="bg-gradient-to-l from-[#ffdd94] to-[#d687f3] font-k2d font-bold border-2 border-black w-[65%] h-[50px] rounded-3xl mb-[8%]" onClick={handlePush}>
      {text}
    </button>
  );
};

export default UiGradienButtonLong;
