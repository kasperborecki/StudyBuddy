import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {IoIosSearch} from 'react-icons/io';
import {useEffect, useState} from 'react';
import ChatsData from '../../services/common/Chats.Selector';
import {Chats} from '../../interfaces/Chats.Interfaces';
import {useAuth} from '../../atoms/Route.Atom';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';
import { useNavigate } from 'react-router';
import { avatarUrl, chatId, userName } from '../../atoms/ChatInformaion.Atom';

const ChatsPage = () => {
  const {session} = useAuth();
  const navigate = useNavigate();

  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatsData, setChatsData] = useState<Chats[]>([]);
  const [, setUsername] = useRecoilState(userName);
  const [, setAvatarUrl] = useRecoilState(avatarUrl);
  const [, setChatId] = useRecoilState(chatId);
  

  const CDNURL =
  'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  useEffect(() => {
    const fetchChats = async () => {
      if (session?.user.id) {
        try {
          setIsLoading(true);
          const userId = session.user.id;
          const chatsRes = await ChatsData.getAllUserChats(userId);
          setChatsData(chatsRes);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchChats();
  }, [session?.user.id]);

  const handleOpenChat = (chatsId: any, avatarUrl: any, userName: any) => {
    navigate(`/chat/${chatsId}`);
    setAvatarUrl(avatarUrl);
    setUsername(userName);
    setChatId(chatsId);
  };

  return (
    <div className='relative min-h-screen'>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div
          className={`relative min-h-screen max-h-screen ${
            isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'
          }`}>
          <div className='flex h-1/4 p-8 items-center justify-between'>
            <p
              className={`pt-2 text-[24px] font-semibold ${
                isDarkMode ? 'text-white' : 'text-[#212427]'
              }`}>
              Wiadomości
            </p>
            <p
              className={`mt-2 pl-1.5 pt-1.5  p-1 text-[36px] rounded-full h-12 w-12 bg-[#ebe5e5] ${
                isDarkMode ? 'text-white' : 'text-[#212427]'
              }`}>
              <IoIosSearch />
            </p>
          </div>
          <div className='mx-6 px-3 pt-1 my-auto bg-[#f2e7f7] rounded-xl'>
            {chatsData.map((chats) => (
              <div onClick={(() => handleOpenChat(chats.id, chats.profile?.avatar_url, chats.profile?.name ))}>
                <div
                  className='flex bg-[#f2e7f7] px-4 rounded-lg max-w-xs h-16 w-full items-center'>
                  <div className='flex-shrink-0'>
                  <img
                  src={CDNURL + chats.profile?.avatar_url}
                  alt={'profileAvatar'}
                      className='w-12 h-12 rounded-full'
                    />
                  </div>
                  <div className='ml-4 text-left'>
                    <p className='font-bold text-lg'>{chats.profile?.name}</p>
                    <p className='text-sm text-gray-600'>
                      {chats.last_message?.context?.slice(0,30)}
                    </p>
                  </div>

                  <div className='flex-1 absolute justify-end items-end right-12'>
                    <p className='text-xs text-gray-500 w-8'>
                      {chats.last_message?.delivered_date?.slice(5, 10)}
                    </p>
                    {chats.un_read_messages?.length !== 0 && (
                      <div className='w-5 h-5 bg-[#A5D825] rounded-full ml-2 pl-1.5 font-bold mt-2'>
                        {chats.un_read_messages?.length}
                      </div>
                    )}
                  </div>
                </div>
                <hr className='bg-[#727272] h-[1px]'></hr>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
