import React, {useState} from 'react';
import '../../styles/ChatUserCard.css';
import {useRecoilState} from 'recoil';
import {avatarUrl, chatId, userName} from '../../atoms/ChatInformaion.Atom';
import { GiCardExchange } from 'react-icons/gi';
import { HiViewGridAdd } from 'react-icons/hi';
import { MdBlockFlipped } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';
import ChatStyleModal from '../../components/modal/ChatStyle.Modal';
import { modalAtom } from '../../atoms/Modal.Atom';
import { useNavigate } from 'react-router';
import { IoArrowBack } from 'react-icons/io5';

const ChatSettings = () => {
  const [usernameValue] = useRecoilState(userName);
  const [avatarUrlValue] = useRecoilState(avatarUrl);
  const [chatIdValue] = useRecoilState(chatId);
  const [showModal, setShowModal] = useRecoilState<boolean>(modalAtom);
  const navigate = useNavigate();
  const [chatsId] = useRecoilState(chatId);


  const handleBackButton = () => {
    navigate(`/chat/${chatsId}`);
  };

  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#FEECEB]'>
       <IoArrowBack
          className={`h-8 w-8 absolute left-4 top-4 z-20 text-black`}
          onClick={handleBackButton}
        /> 
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
        <button className='px-4 py-2 absolute left-4 top-[270px] flex flex-row font-medium text-[15px]'>
          <HiViewGridAdd className='h-5 w-5 text-[#212427]'/>
          <p className='ml-2 text-[#212427]'>Stwórz Zaproszenie</p>
        </button>
        <button className='px-4 py-2 absolute left-4 top-[310px] flex flex-row font-medium text-[15px]' onClick={(() => (setShowModal(true)))}>
          <GiCardExchange className='h-5 w-5 text-[#212427]'/>
          <p className='ml-2 text-[#212427]'>Zmień Motyw</p>
        </button>
        <button className='px-4 py-2 absolute left-4 top-[350px] flex flex-row font-medium text-[15px]'>
          <MdBlockFlipped className='h-5 w-5 text-[#212427]'/>
          <p className='ml-2 text-[#212427]'>Zablokuj</p>
        </button>
        <button className='px-4 py-2 absolute left-4 top-[390px] flex flex-row font-medium text-[15px]'>
          <RiDeleteBinFill  className='h-5 w-5 text-[#212427]'/>
          <p className='ml-2 text-[#212427]'>Usuń Rozmowę</p>
        </button>
      </div>
      <div className='flex flex-col items-start justify-start flex-1 mt-4'>
        <div className='w-32 h-32 rounded-full flex items-center justify-center'>
        </div>
      </div>
      {showModal ? (<ChatStyleModal />) : null}
    </div>
  );
};

export default ChatSettings;
