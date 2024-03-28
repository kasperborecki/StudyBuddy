import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {bottomBarTabId} from '../../atoms/BottomBarTab.Atom';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {FaPlus} from 'react-icons/fa6';
import {AiFillHome} from 'react-icons/ai';
import {IoChatboxEllipsesSharp, IoPersonSharp} from 'react-icons/io5';
import {FaCalendarAlt} from 'react-icons/fa';
import {bottomBarClosed} from '../../atoms/BottomBarClosed.Atom';
import {useState} from 'react';
import {TfiAnnouncement, TfiComments} from 'react-icons/tfi';

const BottomBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useRecoilState(bottomBarTabId);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isBottomBarClosed] = useRecoilState(bottomBarClosed);
  const [isAddingTabOpen, setIsAddingTabOpen] = useState<boolean>(false);

  const handleTabClick = (id: any) => {
    setActiveTab(id);
    switch (id) {
      case 1:
        navigate('/');
        setIsAddingTabOpen(false);
        break;
      case 2:
        navigate('/contacts');
        setIsAddingTabOpen(false);
        break;
      case 3:
        setIsAddingTabOpen(!isAddingTabOpen);
        break;
      case 4:
        navigate('/schedule');
        setIsAddingTabOpen(false);
        break;
      case 5:
        navigate('/profile');
        setIsAddingTabOpen(false);
        break;
      case 6:
        navigate('/add-offer');
        setIsAddingTabOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!isBottomBarClosed ? (
        <div
          className={`fixed z-50 w-full h-20 max-w-lg -translate-x-1/2 rounded-t-3xl bottom-0 left-1/2 shadow-lg shadow-top ${
            isDarkMode
              ? 'bg-[#2B2B2B] border-gray-600 '
              : 'bg-[#FFFFFF] border-black'
          }`}>
          <div className='grid h-full max-w-lg grid-cols-5 mx-auto'>
            <button
              type='button'
              onClick={() => handleTabClick(1)}
              className={`inline-flex flex-col items-center justify-center px-5 rounded-s-full group`}>
              <AiFillHome
                className={`w-[26px] h-[26px] ${
                  activeTab === 1 ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              <p
                className={` ${
                  activeTab === 1 ? 'text-blue-500' : 'text-gray-400'
                }`}>
                Home
              </p>
              <span className='sr-only'>Home</span>
            </button>
            <button
              type='button'
              onClick={() => handleTabClick(2)}
              className={`inline-flex flex-col items-center justify-center px-5 group`}>
              <IoChatboxEllipsesSharp
                className={`w-[26px] h-[26px] ${
                  activeTab === 2 ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              <p
                className={` ${
                  activeTab === 2 ? 'text-blue-500' : 'text-gray-400'
                }`}>
                Czaty
              </p>
              <span className='sr-only'>Wallet</span>
            </button>
            <div className='flex items-center justify-center group '>
              <div className='flex justify-center '>
                <div
                  className={`absolute bg-[#66a1fa] h-[75px] w-20 bottom-20 mr-24 transition ease-in-out duration-300 ${
                    isAddingTabOpen ? 'group-hover:opacity-100' : 'opacity-0'
                  }`}
                  style={{borderRadius: '72% 28% 85% 15% / 75% 25% 75% 25%'}}
                  onClick={() => handleTabClick(6)}>
                  <TfiAnnouncement className='text-[#FFFFFF] h-7 w-7 ml-5 mt-4' />
                </div>
                <div
                  className={`absolute bg-[#66a1fa] h-[75px] w-20 bottom-20 ml-24 transition ease-in-out duration-200 ${
                    isAddingTabOpen ? 'group-hover:opacity-100' : 'opacity-0'
                  }`}
                  style={{borderRadius: '28% 72% 15% 85% / 25% 75% 25% 75%'}}>
                  <TfiComments className='text-[#FFFFFF] h-6 w-6 ml-8 mt-5' />
                </div>
              </div>
              <div className={`absolute z-1 w-24 h-24 bottom-2 rounded-full px-2 py-2 transition ease-in-out duration-400 ${
                        isAddingTabOpen ? 'group-hover:-translate-y-5' : '-translate-y-1'
                      } ${
                        isDarkMode ? 'bg-[#212121]' : 'bg-[#e4e4e4]'
                      }
                      `}>
                <div className='z-20 w-20 h-20 bg-[#66a1fa] rounded-full px-2 py-2'>
                  <button
                    type='button'
                    onClick={() => handleTabClick(3)}
                    className='z-30 inline-flex items-center justify-center w-16 h-16 font-medium bg-[#78aeff] rounded-full text-[#ebe5e5] '>
                    <FaPlus
                      className={`w-[26px] h-[26px] transition ease-in-out duration-200 ${
                        isAddingTabOpen ? 'group-hover:rotate-45' : 'rotate-0'
                      }`}
                    />
                    <span className='sr-only'>New item</span>
                  </button>
                </div>
              </div>
            </div>
            <button
              type='button'
              onClick={() => handleTabClick(4)}
              className={`inline-flex flex-col items-center justify-center px-5 group `}>
              <FaCalendarAlt
                className={`w-[26px] h-[26px]  ${
                  activeTab === 4 ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              <p
                className={` ${
                  activeTab === 4 ? 'text-blue-500' : 'text-gray-400'
                }`}>
                Kalendarz
              </p>
              <span className='sr-only'>Settings</span>
            </button>
            <button
              type='button'
              onClick={() => handleTabClick(5)}
              className={`inline-flex flex-col items-center justify-center px-5 rounded-e-full group`}>
              <IoPersonSharp
                className={` w-[26px] h-[26px] ${
                  activeTab === 5 ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              <p
                className={` ${
                  activeTab === 5 ? 'text-blue-500' : 'text-gray-400'
                }`}>
                Profil
              </p>
              <span className='sr-only'>Profile</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BottomBar;
