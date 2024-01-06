import {useNavigate} from 'react-router-dom';
import AccountSection from '../../components/profileSettings/AccountSection.Component';
import PersonalSection from '../../components/profileSettings/PersonalSection.Component';
import {IoArrowBack} from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import DarkModeSwitch from '../../components/uiComponents/uiSwitch/DarkModeSwitch';

const ProfileSettingsPage = () => {
  const [isDarkMode, ] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/profile');
  };

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-start ${isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'}`}>
      <div
      className='w-full pl-8 pr-8 mb-4'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <IoArrowBack
          className={`h-8 w-8 mb-6 mt-10 ${isDarkMode ? 'text-white' : 'text-black'}`}
          onClick={handleBackButton}
        />
        <DarkModeSwitch />
      </div>
      <PersonalSection />
      <hr className='h-[2px] bg-gray-400 w-[95%] mb-[8%]' />
      <AccountSection />
    </div>
  );
};

export default ProfileSettingsPage;
