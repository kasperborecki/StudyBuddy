import React, {useState} from 'react';
import calendar from '../../asets/calendar.png'
import chat from '../../asets/chat.png'
import home from '../../asets/home.png'
import user from '../../asets/user.png'
import './BottomBar.css';

const BottomBar = () => {
  const [activeTab, setActiveTab] = useState(0);

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
    },
    {icon:  <img
      src={chat}
      alt='chat'
      className='w-[26px] h-[26px]'
    />, id: 1, name: 'Czat'},
    {icon:  <img
      src={calendar}
      alt='Calendar'
      className='w-[26px] h-[26px]'
    />, id: 2, name: 'Plan'},
    {icon:  <img
      src={user}
      alt='user'
      className='w-[26px] h-[26px]'
    />, id: 3, name: 'Profil'},
  ];

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className='sc-bottom-bar'>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`sc-menu-item ${
            activeTab === tab.id ? 'sc-current' : 'sc-not-used'
          }`}
          onClick={() => handleTabClick(tab.id)}>
          <div className='sc-icon-container'>
            {tab.icon}
            {activeTab === tab.id && (
              <div className='sc-white-circle'>
                <div className='sc-black-circle'></div>
              </div>
            )}
          </div>
          <a
            className={`font-k2d font-bold ${
              activeTab === tab.id ? 'sc-active-tab' : 'sc-inactive-tab'
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
