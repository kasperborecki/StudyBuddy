import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {IoIosSearch} from 'react-icons/io';
import {useEffect, useState} from 'react';
import ChatsData from '../../services/common/Chats.Selector';
import {Chats} from '../../interfaces/Chats.Interfaces';
import {useAuth} from '../../atoms/Route.Atom';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';
import {useNavigate} from 'react-router';
import {
  avatarUrl,
  chatId,
  chatStyling,
  userName,
} from '../../atoms/ChatInformaion.Atom';
import {formatDistanceToNow} from 'date-fns';
import {pl} from 'date-fns/locale';
import {BsEnvelopePlus} from 'react-icons/bs';

const ChatsPage = () => {
  const {session} = useAuth();
  const navigate = useNavigate();

  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatsData, setChatsData] = useState<Chats[]>([]);
  const [, setUsername] = useRecoilState(userName);
  const [, setAvatarUrl] = useRecoilState(avatarUrl);
  const [, setChatId] = useRecoilState(chatId);
  const [, setChatStyle] = useRecoilState(chatStyling);

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

  const handleOpenChat = (
    chatsId: any,
    avatarUrl: any,
    userName: any,
    chatBackground: any,
  ) => {
    navigate(`/chat/${chatsId}`);
    setAvatarUrl(avatarUrl);
    setUsername(userName);
    setChatId(chatsId);
    setChatStyle(chatBackground);
  };

  const getTimeDistanceFromNow = (deliveredDate: any) => {
    if (!deliveredDate) return '';
    const date = new Date(deliveredDate);
    if (isNaN(date.getTime())) return '';

    // Obliczanie odległości czasowej
    let distance = formatDistanceToNow(date, {locale: pl, addSuffix: true});

    // Usunięcie słowa "temu" ze zdania
    distance = distance.replace(' temu', '');

    return distance;
  };

  console.log(chatsData);
  return (
    <div className='relative min-h-screen'>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div
          className={`relative min-h-screen max-h-screen ${
            isDarkMode ? 'bg-[#212121]' : 'bg-[#fcfcfc]'
          }`}>
          <div className='flex h-1/4 p-8 items-center justify-between'>
            <p
              className={`pt-2 text-[24px] font-semibold ${
                isDarkMode ? 'text-white' : 'text-[#212427]'
              }`}>
              Wiadomości
            </p>
            <p
              className={`-mt-14 mr-2 text-[36px] rounded-full h-5 w-5 ${
                isDarkMode ? 'text-white' : 'text-[#212427]'
              }`}>
              <IoIosSearch />
            </p>
          </div>
          <div className='mx-4 px-3 pt-1 my-auto rounded-xl'>
            {chatsData.map((chats) => (
              <div
                key={chats.id}
                onClick={() =>
                  handleOpenChat(
                    chats.id,
                    chats.profile?.avatar_url,
                    chats.profile?.name,
                    chats.background_style,
                  )
                }>
                <div className='flex px-4 rounded-lg h-20 w-full items-center shadow-sm shadow-bottom '>
                  <div className='flex-shrink-0'>
                    <img
                      src={
                        CDNURL + 'kasperstudybuddy@gmail.com_1708881272863.png'
                      }
                      // src={CDNURL + chats.profile?.avatar_url}
                      alt={'profileAvatar'}
                      className='w-12 h-12 rounded-full'
                    />
                  </div>
                  <div className='ml-4 text-left'>
                    <p className='font-bold text-lg'>{chats.profile?.name}</p>
                    <p className='text-sm text-gray-600'>
                      {chats.last_message?.context?.slice(0, 30)}
                    </p>
                  </div>
                  <div className='absolute flex flex-col justify-end items-end right-12'>
                    <p className='text-xs text-gray-500 w-18'>
                      {getTimeDistanceFromNow(
                        chats.last_message?.delivered_date,
                      )}
                    </p>
                    {chats.un_read_messages?.length !== 0 && (
                      <span className='indicator-item badge badge-accent right-6 mt-1'>
                        {chats.un_read_messages?.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        type='button'
        className='absolute bottom-24 right-4 z-30 inline-flex items-center justify-center w-16 h-16 font-medium bg-pink-500 rounded-full text-[#ebe5e5] '>
        <BsEnvelopePlus className='w-[26px] h-[26px]' />
        <span className='sr-only'>New item</span>
      </button>
    </div>
  );
};

export default ChatsPage;
