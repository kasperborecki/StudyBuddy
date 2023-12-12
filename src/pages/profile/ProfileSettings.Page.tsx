import {useNavigate} from 'react-router';
import BottomBar from '../../components/bottomBar/BottomBar';
import AccountSection from '../../components/profileSettings/AccountSection';
import PersonalSection from '../../components/profileSettings/PersonalSection';
import {IoArrowBack} from 'react-icons/io5';
import DarkModeSwitch from '../../components/switch/DarkModeSwitch';

const ProfileSettingsPage = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/profile');
  };

  return (
    <div className='relative min-h-screen flex flex-col items-center justify-start bg-[#FAEFFF]'>
      <div
      className='w-full pl-8 pr-8 mb-4'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <IoArrowBack
          className='h-8 w-8 mb-6 mt-10'
          onClick={handleBackButton}
        />
        <DarkModeSwitch />
      </div>

      <PersonalSection />
      <hr className='h-[2px] bg-gray-400 w-[95%] mb-[8%]' />
      <AccountSection />
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
