import { useNavigate } from 'react-router';
import { useRecoilState} from 'recoil';
import { bottomBarTabId } from '../../atoms/BottomBarTab.Atom';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import { IoHomeOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { BsPlusCircle } from "react-icons/bs";
import { GoPerson } from "react-icons/go";



const BottomBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useRecoilState(bottomBarTabId);
  const [isDarkMode,] = useRecoilState(DarkModeAtom);

  const tabs = [
    {
      icon: (
        <IoHomeOutline
          className='w-[26px] h-[26px]'
        />
      ),
      id: 0,
      name: 'Home',
      route: '/',
    },
    {
      icon: (
        <IoChatboxEllipsesOutline
          className='w-[26px] h-[26px]'
        />
      ),
      id: 1,
      name: 'Czat',
      route: '',
    },
    {
      icon: (
        <BsPlusCircle 
          className='w-[26px] h-[26px]'
        />
      ),
      id: 2,
      name: 'Dodaj',
      route: '/add-offer',
    },
    {
      icon: (
        <IoCalendarOutline
          className='w-[26px] h-[26px]'
        />
      ),
      id: 3,
      name: 'Plan',
      route: '',
    },
    {
      icon: (
        <GoPerson
          className='w-[26px] h-[26px] color-white'
        />
      ),
      id: 4,
      name: 'Profil',
      route: '/Profile',
    },
  ];

  const handleTabClick = (id: number, route: string) => {
    setActiveTab(id);
    navigate(route);
  };

  return (
    <div
    className={`absolute flex justify-between w-full text-[26px] pb-[16px] pl-[36px] pr-[36px] bottom-0 ${isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#e0e0e0]'}`}
      style={{
         filter:
            'drop-shadow(0px -1px 6px rgba(0, 0, 0, 0.08)) drop-shadow(0px -2px 12px rgba(0, 0, 0, 0.12))',
      }}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${
            activeTab === tab.id
              ? 'ease-in duration-500 text-[#ffffff] z-50'
              : 'relative text-[#000000] ease-out duration-500 '
          }`}
          style={{
            transform:
              activeTab === tab.id ? 'none' : 'translate3d(0px, 35px, 0px)',
          }}
          onClick={() => handleTabClick(tab.id, tab.route)}>
          <div className={`relative flex w-[56px] h-[56px] items-center justify-center text-center -mt-[20px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {tab.icon}
            {activeTab === tab.id && (
              <div
                className={`absolute w-[130%] h-[130%] rounded-full ${isDarkMode ? 'bg-[#212121]' : 'bg-[#f1e9f5]'}`}
                style={{
                  zIndex: -1,
                }}>
                <div
                  className='absolute w-[75%] h-[75%] bg-[#4887df] rounded-full m-[12.5%]'
                  style={{
                    zIndex: -1,
                  }}
                />
              </div>
            )}
          </div>
          <a
             className={`font-k2d font-bold ${
              activeTab === tab.id
                ? `text-[18px] pt-[15px] ${isDarkMode ? 'text-white' : 'text-black'}`
                : 'text-black text-[0px]'
            }`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {tab.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default BottomBar;
