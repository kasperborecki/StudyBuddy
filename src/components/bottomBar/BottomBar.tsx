import {useState} from 'react';
import calendar from '../../assets/bottomBar/calendar.png';
import chat from '../../assets/bottomBar/chat.png';
import home from '../../assets/bottomBar/home.png';
import user from '../../assets/bottomBar/user.png';
import { useNavigate } from 'react-router';
import { useRecoilState} from 'recoil';
import { bottomBarTabId } from '../../atoms/BottomBarTab.Atom';

const BottomBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useRecoilState(bottomBarTabId);
  const tabs = [
    {
      icon: (
        <img
          src={home}
          alt='home'
          className='w-[26px] h-[26px]'
        />
      ),
      id: 0,
      name: 'Home',
      route: '/',
    },
    {
      icon: (
        <img
          src={chat}
          alt='chat'
          className='w-[26px] h-[26px]'
        />
      ),
      id: 1,
      name: 'Czat',
      route: '',
    },
    {
      icon: (
        <img
          src={calendar}
          alt='Calendar'
          className='w-[26px] h-[26px]'
        />
      ),
      id: 2,
      name: 'Plan',
      route: '',
    },
    {
      icon: (
        <img
          src={user}
          alt='user'
          className='w-[26px] h-[26px]'
        />
      ),
      id: 3,
      name: 'Profil',
      route: '/Profile',
    },
  ];

  const handleTabClick = (id: number, route: string) => {
    setActiveTab(id);
    navigate(route); // Use route instead of '{route}'
  };

  return (
    <div
    className='absolute flex justify-between w-full text-[26px] pb-[16px] pl-[36px] pr-[36px] bottom-0 bg-[#e0e0e0]'
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
          <div className='relative flex w-[56px] h-[56px] items-center justify-center text-center -mt-[20px]'>
            {tab.icon}
            {activeTab === tab.id && (
              <div
                className='absolute w-[130%] h-[130%] bg-[#f1e9f5] rounded-full'
                style={{
                  zIndex: -1,
                }}>
                <div
                  className='absolute w-[75%] h-[75%] bg-[#0D6FFA] rounded-full m-[12.5%]'
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
                ? 'text-black text-[18px] pt-[15px]'
                : 'text-black text-[0px]' // Change text-white to text-black
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
