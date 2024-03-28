import React from 'react';

interface OwnerMsgBoxProps {
  text: string;
  isMine: boolean;
  date: string;
}

const OwnerMsgBoxComponent: React.FC<OwnerMsgBoxProps> = ({ text, isMine, date }) => {
  return (
    <div className={`flex font-roboto ${isMine ? 'justify-end ml-20' : 'justify-start mr-20'} mb-2`}>
      <div className={`rounded-2xl p-3 ${isMine ? 'ml-2 bg-[#4456fc] rounded-br-none text-white' : 'mr-2 bg-[#e6e3ff] bg-opacity-100 rounded-bl-none text-black'}`}>
        {text}
      </div>
    </div>
  );
};

export default OwnerMsgBoxComponent;
