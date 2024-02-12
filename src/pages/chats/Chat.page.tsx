import { IoArrowBack } from 'react-icons/io5';
import { avatarUrl, chatId, chatStyling, userName } from '../../atoms/ChatInformaion.Atom';
import { useRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { bottomBarClosed } from '../../atoms/BottomBarClosed.Atom';
import { useNavigate } from 'react-router';
import OwnerMsgBoxComponent from '../../components/messageBox/OwnerMsgBox.Component';
import { Messages } from '../../interfaces/Chats.Interfaces';
import ChatsData from '../../services/common/Chats.Selector';
import { useAuth } from '../../atoms/Route.Atom';
import { GiCardExchange } from "react-icons/gi";
import '../../styles/ChatBackGround.css';
import '../../styles/ChatMessageInput.css';


const ChatPage = () => {
  const navigate = useNavigate();
  const CDNURL = 'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  const [usernameValue] = useRecoilState(userName);
  const [avatarUrlValue] = useRecoilState(avatarUrl);
  // const [chatStyle, setChatSt] = useRecoilState(chatStyling);
  const [chatIdValue] = useRecoilState(chatId);
  const [isBottomBarClosed, setIsBottomBarClosed] = useRecoilState(bottomBarClosed);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messagesOutPut, setMessagesOutPut] = useState<Messages[]>([]);
  const { session } = useAuth();
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesOutPut]);

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const updateMessages = async () => {
    try {
      const messagesRes = await ChatsData.getAllCurentChatMsg(chatIdValue);
      setMessagesOutPut(messagesRes);
    } catch (error: any) {
      console.error("Error updating messages:", error.message);
    }
  };
  
  const handleSubmit = async () => {
    if (messageText.trim() !== '') {
      setIsLoading(true);
      await ChatsData.addNewMessage(messageText, userId, chatIdValue);
      setMessageText('');
      setIsLoading(false);
      // Po wysłaniu nowej wiadomości zaktualizuj listę wiadomości
      updateMessages();
    }
  };
  

  return (
    <>
        <div className="card">
          <div className={`top-section h-screen bg-gradient-to-r from-fuchsia-600 to-pink-600 `}>
            <div className="border"></div>
            <div className="borderTwo"></div>
            <div className="icons">
              <IoArrowBack
                className='h-8 w-8 mt-4 ml-3 text-white'
                onClick={handleBackButton}
                />
              <div className='flex'>
                <img
                  src={CDNURL + avatarUrlValue}
                  alt={'profileAvatar'}
                  className='mt-1 ml-3 w-12 h-12 rounded-full'
                  />
                <p className='pl-3 pt-3.5 font-bold text-[15px]'>{usernameValue}</p>
              </div>
              <div className="social-media"><GiCardExchange className='h-7 w-7 mt-3 text-white'/></div>
            </div>
            <div className="flex flex-col h-screen justify-end items-center">
              <div className="flex flex-col w-full max-w-sm h-4/5 overflow-y-auto p-4 mb-14">
              {messagesOutPut.slice().reverse().map((message) => (
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
              <div className="messageBox">
                <input
                  placeholder="Message..."
                  type="text"
                  id="messageInput"
                  value={messageText}
                  onChange={handleTextAreaChange}
                />
                <button id="sendButton" onClick={handleSubmit}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                    <path
                      fill="none"
                      d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="33.67"
                      stroke="#212427"
                      d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ChatPage;
