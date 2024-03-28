import {IoArrowBack, IoSend} from 'react-icons/io5';
import {
  avatarUrl,
  chatId,
  userId as chatUserId, // Rename userId import to avoid conflict
  chatStyling,
  userName,
} from '../../atoms/ChatInformaion.Atom';
import {useRecoilState} from 'recoil';
import {useEffect, useRef, useState} from 'react';
import {bottomBarClosed} from '../../atoms/BottomBarClosed.Atom';
import {useNavigate} from 'react-router';
import OwnerMsgBoxComponent from '../../components/messageBox/OwnerMsgBox.Component';
import {ChatStyle, Chats, Messages} from '../../interfaces/Chats.Interfaces';
import ChatsData from '../../services/common/Chats.Selector';
import {useAuth} from '../../atoms/Route.Atom';
import '../../styles/ChatBackGround.css';
import '../../styles/ChatMessageInput.css';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';
import {ChatStyleing} from '../../constans/ChatStyleing.Constants';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom'; // Correct import path
import {HiDotsVertical} from 'react-icons/hi';
import {FaVideo} from 'react-icons/fa';
import {BiSolidPhoneCall} from 'react-icons/bi';

const ChatPage = () => {
  const navigate = useNavigate();
  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [usernameValue] = useRecoilState(userName);
  const [avatarUrlValue] = useRecoilState(avatarUrl);
  const [chatIdValue] = useRecoilState(chatId);
  const [chatUserIdValue] = useRecoilState(chatUserId);
  const [chatStylingValue] = useRecoilState(chatStyling);
  const [, setIsBottomBarClosed] = useRecoilState(bottomBarClosed);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messagesOutPut, setMessagesOutPut] = useState<Messages[]>([]);
  const {session} = useAuth();
  const [messageText, setMessageText] = useState<string>('');

  const userId = session?.user.id;

  useEffect(() => {
    setIsBottomBarClosed(true);
  }, [setIsBottomBarClosed]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const messagesRes = await ChatsData.getAllCurentChatMsg(chatIdValue);
        setMessagesOutPut(messagesRes);
        await ChatsData.updateMessageReadState(chatIdValue, chatUserIdValue);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [chatIdValue]);

  const handleBackButton = () => {
    navigate('/contacts');
    setIsBottomBarClosed(false);
  };

  const handleOpenSettings = () => {
    navigate('/chat-settings');
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messagesOutPut]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };
  

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const updateMessages = async () => {
    try {
      const messagesRes = await ChatsData.getAllCurentChatMsg(chatIdValue);
      setMessagesOutPut(messagesRes);
    } catch (error: any) {
      console.error('Error updating messages:', error.message);
    }
  };

  const handleSubmit = async () => {
    if (messageText.trim() !== '') {
      await ChatsData.addNewMessage(messageText, userId, chatIdValue);
      setMessageText('');
      updateMessages();
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingSuspense />
        </div>
      ) : (
        <div
          className={`relative min-h-screen max-h-screen ${
            isDarkMode ? 'bg-[#212121]' : 'bg-[#fcfcfc]'
          }`}>
          <div className='fixed flex flex-row pt-3 px-2 w-full h-20 bg-[#e6e3ff] bg-opacity-50 z-20'>
            <div className='flex flex-row w-[50%]'>
              <IoArrowBack
                className='h-8 w-8 ml-3 mt-2 text-black'
                onClick={handleBackButton}
              />
              <img
                src={CDNURL + avatarUrlValue}
                alt={'profileAvatar'}
                className='ml-3 w-12 h-12 rounded-full'
              />
              <p className='pl-3 pt-2.5 font-bold text-[18px] text-[#3d3e3f]'>
                {usernameValue &&
                  usernameValue.charAt(0).toUpperCase() +
                    usernameValue.slice(1)}
              </p>
            </div>
            <div className='flex flex-row w-[50%] justify-end pr-2 mt-3'>
              <BiSolidPhoneCall className='w-6 h-6 text-blue-500' />
              <FaVideo className='w-6 h-6 text-blue-500 mr-3 ml-4' />
              <HiDotsVertical className='w-6 h-6 text-blue-500' />
            </div>
          </div>
          <div className='flex z-0 h-screen'>
            <div className='mt-24 pb-4 px-2 h-4/5 overflow-y-auto w-full'>
              {messagesOutPut
                .slice()
                .reverse()
                .map((message) => (
                  <OwnerMsgBoxComponent
                    key={message.message_id}
                    text={message.context}
                    isMine={message.user_id === userId}
                    date={message.delivered_date}
                  />
                ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className='absolute bottom-4 w-full flex justify-center'>
            <div className='messageBox'>
              <input
                placeholder='Napisz Wiadomość...'
                type='text'
                id='messageInput'
                className='w-[90%] bg-white'
                value={messageText}
                onChange={handleTextAreaChange}
              />
              <button
                className='bg-blue-500 h-[50px] w-[50px] rounded-2xl -mr-7'
                onClick={handleSubmit}>
                <IoSend className='text-white h-5 w-5 mx-auto flex' />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
