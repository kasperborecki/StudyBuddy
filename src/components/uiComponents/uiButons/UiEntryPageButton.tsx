import React from 'react';
import {useNavigate} from 'react-router-dom';

interface CustomButtonProps {
  text: string;
  push: string;
}

const UiPurpleButtonLong: React.FC<CustomButtonProps> = ({ text, push }) => {
  const navigate = useNavigate();

  const handlePush = () => {
    navigate(push);
  };
  
  return (
    <button className="bg-[#ccabd8] border-2 border-black w-[65%] h-[50px] rounded-3xl mb-[8%]" onClick={handlePush}>
      {text}
    </button>
  );
};

export default UiPurpleButtonLong;
