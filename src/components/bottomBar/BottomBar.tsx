import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {bottomBarTabId} from '../../atoms/BottomBarTab.Atom';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import { FaPlus } from "react-icons/fa6";
import {AiFillHome} from 'react-icons/ai';
import {IoChatboxEllipsesSharp} from 'react-icons/io5';
import {FaCalendarAlt} from 'react-icons/fa';
import {IoSettingsSharp} from 'react-icons/io5';

const BottomBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useRecoilState(bottomBarTabId);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  console.log(activeTab);
  const handleTabClick = (id: number) => {
    setActiveTab(id);
    switch (id) {
      case 1:
        navigate('/');
        break;
      case 2:
        navigate('/chats');
        break;
      case 3:
        navigate('/add-offer');
        break;
      case 4:
        navigate('/home');
        break;
      case 5:
        navigate('/profile-settings-page');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`fixed z-50 w-[90%] h-16 max-w-lg -translate-x-1/2 rounded-full bottom-4 border left-1/2 ${
        isDarkMode
          ? 'bg-[#2B2B2B] border-gray-600 '
          : 'bg-[#ebe5e5] border-black'
      }}`}>
      <div className='grid h-full max-w-lg grid-cols-5 mx-auto'>
        <button
          type='button'
          onClick={() => handleTabClick(1)}
          className={`inline-flex flex-col items-center justify-center px-5 rounded-s-full group ${
            isDarkMode
              ? activeTab === 1
                ? 'hover:bg-[#212121]'
                : ''
              : activeTab === 1
              ? 'hover:bg-gray-600 hover:text-[#ebe5e5]'
              : ''
          }`}>
          <AiFillHome className='w-[26px] h-[26px]' />
          <span className='sr-only'>Home</span>
        </button>
        <div
          className={` absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip  ${
            isDarkMode ? 'bg-[#212121]' : 'bg-gray-100'
          }`}>
          Home
        </div>
        <button
          type='button'
          onClick={() => handleTabClick(2)}
          className={`inline-flex flex-col items-center justify-center px-5 group ${
            isDarkMode
              ? activeTab === 1
                ? 'hover:bg-[#212121]'
                : ''
              : activeTab === 1
              ? 'hover:bg-gray-600 hover:text-[#ebe5e5]'
              : ''
          }`}>
          <IoChatboxEllipsesSharp className='w-[26px] h-[26px]' />
          <span className='sr-only'>Wallet</span>
        </button>
        <div
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
          Wallet
        </div>
        <div className='flex items-center justify-center'>
          <button
            type='button'
            onClick={() => handleTabClick(3)}
            className='inline-flex items-center justify-center w-12 h-12 font-medium bg-[#893Eff] rounded-full hover:bg-[#5b3291] group focus:ring-8 focus:ring-[#472672] focus:outline-none text-[#ebe5e5]'>
             <FaPlus className='w-[26px] h-[26px]' />
            <span className='sr-only'>New item</span>
          </button>
        </div>
        <div
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
          Create new item
        </div>
        <button
          type='button'
          onClick={() => handleTabClick(4)}
          className={`inline-flex flex-col items-center justify-center px-5 group ${
            isDarkMode
            ? activeTab === 1
              ? 'hover:bg-[#212121]'
              : ''
            : activeTab === 1
            ? 'hover:bg-gray-600 hover:text-[#ebe5e5]'
            : ''
        }`}>
          <FaCalendarAlt className='w-[26px] h-[26px]' />
          <span className='sr-only'>Settings</span>
        </button>
        <div
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
          Settings
        </div>
        <button
          type='button'
          onClick={() => handleTabClick(5)}
          className={`inline-flex flex-col items-center justify-center px-5 rounded-e-full group ${
            isDarkMode
              ? activeTab === 5
                ? 'bg-[#212121]'
                : ''
              : activeTab === 5
              ? 'bg-gray-600 text-[#ebe5e5]'
              : ''
          }`}>
          <IoSettingsSharp className='w-[26px] h-[26px]' />
          <span className='sr-only'>Profile</span>
        </button>
        <div
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
          Profile
        </div>
      </div>
    </div>
  );
};

export default BottomBar;