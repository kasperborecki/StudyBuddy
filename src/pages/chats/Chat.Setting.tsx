import React, {useState} from 'react';
import '../../styles/ChatUserCard.css';
import {useRecoilState} from 'recoil';
import {avatarUrl, chatId, userName} from '../../atoms/ChatInformaion.Atom';

const ChatSettings = () => {
  const [usernameValue] = useRecoilState(userName);
  const [avatarUrlValue] = useRecoilState(avatarUrl);
  const [chatIdValue] = useRecoilState(chatId);

  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <img
        src={CDNURL + avatarUrlValue}
        alt={'profileAvatar'}
        className='mt-6 w-[90px] h-[90px] ml-1/2 rounded-full z-20 absolute top-0'
      />
      <p className='absolute top-32 z-20 font-bold text-[18px]'>
        {usernameValue}
      </p>
      <div className='cardSettings mt-10'>
        <div className='circleSettings'></div>
        <div className='circleSettings'></div>
        <div className='card-innerSettings'></div>
      </div>
      <div className='flex flex-col items-start justify-start space-y-4 mt-4'>
      <p className='px-4 py-2 absolute left-4 top-[240px] font-bold text-[18px]'>
          Narzędzia
        </p>
        <button className='px-4 py-2 absolute left-4 top-[270px] font-medium text-[15px]'>
          Stwórz Zaproszenie
        </button>
        <button className='px-4 py-2 absolute left-4 top-[310px] font-medium text-[15px]'>
          Zmień Motyw
        </button>
        <button className='px-4 py-2 absolute left-4 top-[350px] font-medium text-[15px]'>
          Zablokuj
        </button>
      </div>
      <div className='flex flex-col items-start justify-start flex-1 mt-4'>
        <div className='w-32 h-32 rounded-full flex items-center justify-center'>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;
