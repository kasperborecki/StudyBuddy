import {useRecoilState, useResetRecoilState} from 'recoil';
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
  const [chatsType, setChatsType] = useState<number>(1)

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

    let distance = formatDistanceToNow(date, {locale: pl, addSuffix: true});

    distance = distance.replace(' temu', '');

    return distance;
  };

  console.log(chatsData);
  return (
    <div className='relative min-h-screen font-roboto'>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div
          className={`relative min-h-screen max-h-screen ${
            isDarkMode ? 'bg-[#212121]' : 'bg-[#fcfcfc]'
          }`}>
          <div className='flex flex-col h-1/4 p-8 items-center justify-center'>
            <p
              className={`text-[24px] font-semibold ${
                isDarkMode ? 'text-white' : 'text-[#3d3e3f]'
              }`}>
              Wiadomości
            </p>
            <div
              className={`flex flex-row rounded-2xl w-full mt-4 h-12 ${
                isDarkMode ? '' : 'bg-gray-100'
              }`}>
              <IoIosSearch className='h-7 w-7 mt-2.5 ml-3 text-blue-500' />
              <p className='mt-3 ml-3 text-gray-400'>Szukaj</p>
            </div>
            <div className='flex flex-row w-full border-2 rounded-2xl border-gray-200 h-12 mt-4 py-1.5 px-2 text-[#f1f1f1]'>
              <button className={`w-[50%] h-full rounded-md mr-1 ${chatsType === 1 ? 'bg-blue-500' : 'bg-gray-200 text-gray-400'}`} onClick={(() => setChatsType(1))}>Osobiste</button>
              <button className={`w-[50%] h-full rounded-md ml-1 ${chatsType === 2 ? 'bg-blue-500' : 'bg-gray-200 text-gray-400'}`} onClick={(() => setChatsType(2))}>Grupowe</button>
            </div>
          </div>

          <div className='mx-4 pt-1 my-auto rounded-xl'>
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
                <div className='relative flex px-4 rounded-lg h-20 w-full items-center shadow-sm shadow-bottom '>
                  <div className='flex-shrink-0'>
                    <img
                      src={CDNURL + chats.profile?.avatar_url}
                      alt={'profileAvatar'}
                      className='w-14 h-14 rounded-full'
                    />
                    {chats.un_read_messages?.length !== 0 && (
                      <span className='absolute top-[50px] left-14 rounded-full h-5 w-5 bg-blue-500 px-1.5 pt-0.5 text-sm text-white'>
                        {chats.un_read_messages?.length}
                      </span>
                    )}
                  </div>
                  <div className='ml-4 text-left'>
                    <p className='font-bold text-lg text-[#3d3e3f]'>
                      {chats.profile?.name}
                    </p>
                    <p className='text-sm text-gray-600'>
                      {chats.last_message?.context?.slice(0, 30)}
                    </p>
                  </div>
                  <div className='absolute flex flex-col justify-end items-end right-8 top-4'>
                    <p
                      className={`text-xs w-18 ${
                        chats.un_read_messages?.length !== 0
                          ? 'text-blue-500'
                          : 'text-gray-500'
                      } `}>
                      {getTimeDistanceFromNow(
                        chats.last_message?.delivered_date,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        type='button'
        className='absolute bottom-24 right-4 z-30 inline-flex items-center justify-center w-16 h-16 font-medium bg-blue-500 rounded-full text-[#ebe5e5] '>
        <BsEnvelopePlus className='w-[26px] h-[26px]' />
        <span className='sr-only'>New item</span>
      </button>
    </div>
  );
};

export default ChatsPage;
