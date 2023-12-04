// BottomBar.js
import React, { useState } from 'react';
import { IoHomeOutline, IoChatbubblesOutline } from 'react-icons/io5';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdPersonOutline } from 'react-icons/md'; // Corrected the import for CiUser
import './BottomBar.css';

const BottomBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: <IoHomeOutline />, id: 0 },
    { icon: <IoChatbubblesOutline />, id: 1 },
    { icon: <FaRegCalendarAlt />, id: 2 },
    { icon: <MdPersonOutline />, id: 3 }, // Changed CiUser to MdPersonOutline
  ];

  const handleTabClick = (id: any) => {
    setActiveTab(id);
  };

  return (
    <div className="sc-bottom-bar" style={{ backgroundImage: `radial-gradient(circle at ${activeTab * 36.5}% 8px, transparent 36px, #ffffff 37px)` }}>
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={`sc-menu-item ${activeTab === tab.id ? 'sc-current' : 'sc-not-used'}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.icon}
        </a>
      ))}
      <div className="sc-nav-indicator" style={{ left: `${activeTab * 25.5}%` }}></div>
    </div>
  );
};

export default BottomBar;
