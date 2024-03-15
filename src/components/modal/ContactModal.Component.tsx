import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {
  requestHourLessonAtom,
  requestModalLessonAtom,
  requestWeekDayLessonAtom,
} from '../../atoms/RequestLesson.Atom';
import {RxCross2} from 'react-icons/rx';
import {useAuth} from '../../atoms/Route.Atom';
import OffersData from '../../services/common/Offer.Service';
import ChatsData from '../../services/common/Chats.Selector';
import { useNavigate } from 'react-router';

interface ContactModalProps {
  avatar?: string;
  name?: string;
  surname?: string;
  offerId?: string;
  ownerId?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({
  avatar,
  name,
  surname,
  offerId,
  ownerId,
}) => {
  const navigate = useNavigate();
  const {session} = useAuth();
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [showModal, setShowModal] = useRecoilState<boolean>(
    requestModalLessonAtom,
  );
  const [requestHour] = useRecoilState(requestHourLessonAtom);
  const [requestWeekDay] = useRecoilState(requestWeekDayLessonAtom);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [topic, setTopic] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [createdChatId, setCreatedChatId] = useState<string>('');

  const handleCreateRequest = async () => {
    setIsLoading(true);
    if (session?.user.id) {
      const userId = session.user.id;
      try {
        await OffersData.createRequest(
          offerId,
          userId,
          requestWeekDay,
          requestHour,
          topic,
          ownerId,
        );
        const { chatId } = await ChatsData.createChatAfterRequest(
          userId,
          ownerId,
          message,
        );
        setIsLoading(false);
        setShowModal(false);
        navigate(`/chat/${chatId}`); // Przekazanie chatId bezpośrednio do nawigacji
      } catch (error) {
        console.error('Error while adding offer:', error);
        setIsLoading(false);
      }
    }
  };
  


  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  return showModal ? (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]'>
      <div
        className={` p-4 shadow-md w-96 h-68 rounded-3xl font-roboto font-semibold ${
          isDarkMode
            ? 'bg-[#212121] text-white text-opacity-80'
            : 'bg-[#fcfcfc] text-[#414344]'
        }`}>
        <RxCross2
          className='h-7 w-7 text-[#212427]'
          onClick={() => setShowModal(false)}
        />
        <div className='flex flex-row mt-3'>
          <img
            src={CDNURL + avatar}
            alt={'profileAvatar'}
            className='ml-6 w-16 h-16 rounded-3xl'
          />
          <div className='flex flex-col mt-1 ml-4'>
            <div className='flex flex-row'>
              <p className='ml-4'>
                {name && name.charAt(0).toUpperCase() + name.slice(1)}
              </p>
              <p className='ml-1'>
                {surname && surname.charAt(0).toUpperCase() + surname.slice(1)}
              </p>
            </div>
            <div className='flex flex-row text-gray-500 mt-1'>
              <p className='ml-4 border-r-2 border-gray-400 pr-2'>
                {requestWeekDay}
              </p>
              <p className='ml-2'>{requestHour}</p>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <p
            className={`text-[18px] font-semibold font-Roboto mt-4 mb-2 ${
              isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-[#646464]'
            }`}>
            Temat Zajęć
          </p>
          <input
            className='flex w-full h-12 border border-gray-400 hover:border-black rounded-lg bg-white font-Roboto text-[#2f3235] text-[16px] pl-2'
            onChange={(event) => setTopic(event.target.value)}
            placeholder='Funkcja kwadratowa.'
          />
          <p
            className={`text-[18px] font-semibold font-Roboto mt-4 mb-2 ${
              isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-[#646464]'
            }`}>
            Wiadomość do nauczyciela
          </p>
          <textarea
            className='flex w-full h-24 border border-gray-400 hover:border-black rounded-lg bg-white font-Roboto text-[#2f3235] text-[16px] px-2 pt-2'
            onChange={(event) => setMessage(event.target.value)}
            placeholder='Dzień dobry, chciałbym/chciałabym zapisać się na lekcje z funkcji kwadratowej'
          />
        </div>
        <button
          className=' mt-4 mx-[5%] w-[90%] h-10 font-Roboto text-lg border-solid border-2 border-slate-400 rounded-3xl p-1'
          onClick={handleCreateRequest}>
          <p
            className={` rounded-3xl font-medium text-[17px] ${
              isDarkMode ? 'text-[#dddddd] text-opacity-90' : 'text-[#4d4d4d]'
            }`}>
            Zarezerwuj
          </p>
        </button>
      </div>
    </div>
  ) : null;
};

export default ContactModal;
