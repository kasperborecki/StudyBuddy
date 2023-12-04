// BottomBar.js
import React, { useState } from 'react';
import { IoHomeOutline, IoChatbubblesOutline } from 'react-icons/io5';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import './BottomBar.css';

const BottomBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: <IoHomeOutline />, id: 0 },
    { icon: <IoChatbubblesOutline />, id: 1 },
    { icon: <FaRegCalendarAlt />, id: 2 },
    { icon: <CiUser />, id: 3 },
  ];

  const handleTabClick = (id: any) => {
    setActiveTab(id);
  };

  return (
    <div className="sc-bottom-bar"
    // style={{
    //     backgroundImage: `radial-gradient(circle at ${activeTab === 0 ? '48px' : `${activeTab * 30}%`} 6px, transparent 36px, #ffffff 37px)`
    //   }}
      style={{
        backgroundImage: `radial-gradient(circle at ${activeTab === 0 ? '12.5%' : activeTab === 1 ? '38%' : activeTab === 2 ? '62.5%' : '87.5%'} 8px, transparent 36px, #ffffff 37px)`
      }}
      >
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={`sc-menu-item ${activeTab === tab.id ? 'sc-current' : 'sc-not-used'}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.icon}
        </a>
      ))}
      <div className="sc-nav-indicator" style={{ left: ` ${activeTab === 0 ? '5.5%' : activeTab === 1 ? '31%' : activeTab === 2 ? '56%' : '81%'}` }}></div>
    </div>
  );
};

export default BottomBar;
