import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import DarkModeSwitch from '../../components/uiComponents/uiSwitch/DarkModeSwitch';
import avatar from '../../assets/WIN_20231211_14_27_19_Pro.jpg';
import {IoIosArrowForward, IoMdNotificationsOutline} from 'react-icons/io';
import {FiMoon} from 'react-icons/fi';
import '../../styles/DarkModeSwitch.css';
import { FaQuestion, FaRegMoneyBillAlt, FaRegStar } from 'react-icons/fa';
import { MdHistory, MdOutlineBugReport } from 'react-icons/md';
import { CiLock, CiStar } from 'react-icons/ci';
import { TbLogout2, TbPassword } from "react-icons/tb";
import { IoLanguage, IoLockOpenOutline, IoTrashBinOutline } from 'react-icons/io5';
import { RxExit } from 'react-icons/rx';

const ProfileSettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();

  return (
    <div
      className={`fixed w-full h-[1400px] flex flex-col items-center justify-start px-5 pt-6 ${
        isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'
      }`}>
      <p className={`text-[25px] font-semibold ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>Ustawienia</p>
      <div className='flex flex-row justify-between bg-gray-300 bg-opacity-20 w-full h-22 mt-6 p-2 rounded-3xl shadow-md shadow-bottom'>
        <img
          src={avatar}
          alt='avatar'
          className=' w-16 h-16 rounded-full border-8 '
        />
        <div>
          <p className={`text-[17px] font-semibold -ml-14 mt-2 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>Kasper Borecki</p>
          <p className={`opacity-80 -ml-14 mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Kasper.borecki05@gmail.com
          </p>
        </div>
        <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
      </div>
      <div className='flex flex-col bg-gray-300 bg-opacity-20 w-full mt-7 p-2 rounded-3xl px-4 shadow-md shadow-bottom mb-20'>
        <div className='flex flex-row justify-between mt-2'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-purple-700 p-1'>
            <FiMoon className='h-6 w-6 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Dark Mode
          </p>
          <label>
            <input
              className='toggle-checkbox'
              type='checkbox'
              onChange={(() => setIsDarkMode(!isDarkMode))}
            />
            <div className='toggle-slot'>
              <div className='sun-icon-wrapper'>
                <div
                  className='iconify sun-icon'
                  data-icon='feather-sun'
                  data-inline='false'></div>
              </div>
              <div className='toggle-button'></div>
              <div className='moon-icon-wrapper'>
                <div
                  className='iconify moon-icon'
                  data-icon='feather-moon'
                  data-inline='false'></div>
              </div>
            </div>
          </label>
        </div>
        <div className='flex flex-row justify-between mt-8'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-red-500 p-1'>
            <IoMdNotificationsOutline   className='h-6 w-6 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Powiadomienia
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-cyan-600 p-1'>
            <IoLockOpenOutline  className='h-6 w-6 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Prywatność
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-green-600 p-1'>
            <MdHistory className='h-6 w-6 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Historia zajęć
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-orange-400 p-1'>
            <FaRegMoneyBillAlt  className='h-6 w-6 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Płatności
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-cyan-500 p-1'>
            <FaQuestion   className='h-6 w-6 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            FAQ
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-emerald-600 p-1'>
            <IoLanguage  className='h-6 w-6 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Zmień język
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <hr className='w-full bg-gray-500 h-[1px]'></hr>
        <div className='flex flex-row justify-between mt-2'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-amber-800 p-1.5'>
            <MdOutlineBugReport   className='h-5 w-5 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Zgłoś błąd
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-green-800 p-1.5'>
            <TbPassword   className='h-5 w-5 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Zmień hasło
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-pink-700 p-1.5'>
            <RxExit  className='h-5 w-5 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Wyloguj się
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className='relative flex flex-row w-8 h-8 rounded-full bg-rose-600 p-1.5'>
            <IoTrashBinOutline className='h-5 w-5 text-white' />
          </div>
          <p className={`absolute left-[80px] text-[16px] font-semibold mt-1 ${isDarkMode ? 'text-[#ffffff] text-opacity-80' : ' '}`}>
            Usuń konto
          </p>
          <IoIosArrowForward className='h-6 w-6 my-auto text-gray-600 opacity-80' />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
