import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../../atoms/Modal.Atom';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import { ChatStyleing } from '../../constans/ChatStyleing.Constants';
import ChatsData from '../../services/common/Chats.Selector';
import { chatId, chatStyling } from '../../atoms/ChatInformaion.Atom';

const ChatStyleModal = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [showModal, setShowModal] = useRecoilState<boolean>(modalAtom);
  const [selectedValue, setSelectedValue] = useState<string>('1');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [chatIdValue] = useRecoilState(chatId);
  const [,setChatStylingValue] = useRecoilState(chatStyling)


  const handleColorSelect = (color: string, id: string) => {
    setSelectedColor(color);
    setSelectedValue(id);
  };

  const handleChangeChatStyle = async () => {
    try {
      console.log(chatIdValue);
      await ChatsData.updateChatStyle(chatIdValue, selectedValue);
      setChatStylingValue(selectedValue);
      console.log(selectedValue);
    } catch (error) {
      console.error('Error while adding offer:', error);
    } finally {
      setShowModal(false);
    }
};


  return showModal ? (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]'>
      <div
        className={`p-8 pt-4 shadow-md w-[85%] h-68 rounded-3xl ${
          isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'
        }`}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-[#212427]'
          }`}
          style={{ textAlign: 'center' }}>
          Wybierz Motyw
        </h2>
        <div
          className={`mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1rem',
            justifyContent: 'center',
          }}>
          {ChatStyleing.map((style, index) => (
            <div
              key={index}
              className='flex flex-col items-center cursor-pointer'
              onClick={() => handleColorSelect(style.style, style.id)}>
              <div
                className={`rounded-full h-10 w-10 ${style.style} mr-2 ${
                  selectedColor === style.style ? ' border-[3px] border-blue-500' : ''
                }`}
              />
              <p className='text-[#212427]' style={{ textAlign: 'center' }}>
                {style.name}
              </p>
            </div>
          ))}
        </div>
        <div className='flex flex-row justify-between'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
            onClick={() => {
                handleChangeChatStyle();
            }}
            disabled={!selectedValue}>
            Zapisz
          </button>
          <button
            className='bg-gray-500 text-white px-4 py-2 rounded'
            onClick={() => {
              setShowModal(false);
            }}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ChatStyleModal;
