import React from 'react';

interface CustomHeaderProps {
  text: string;
}

const AccoundHeader: React.FC<CustomHeaderProps> = ({ text }) => {
  
  return (
    <button className="bg-gradient-to-l from-[#ffdd94] to-[#d687f3] font-jua text-[20px] font-bold border-2 border-black w-[80%] h-[50px] rounded-3xl mb-4">
      {text}
    </button>
  );
};

export default AccoundHeader;
