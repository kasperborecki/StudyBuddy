import React from 'react';
// import { useNavigate } from 'react-router';

interface CustomButtonProps {
  text: string;
}

const UiPurpleButtonShort: React.FC<CustomButtonProps> = ({text}) => {
//   const navigate = useNavigate();

//   const handlePush = () => {
//     navigate(push);
//   };
  
  return (
    <button className="bg-[#ccabd8] border-2 border-black w-[50%] h-[50px] rounded-3xl mt-[8%]">
      {text}
    </button>
  );
};

export default UiPurpleButtonShort;
