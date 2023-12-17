import {useRecoilState} from 'recoil';
import BottomBar from '../bottomBar/BottomBar';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {useNavigate} from 'react-router';
import {IoArrowBack} from 'react-icons/io5';
import AccoundHeader from '../uiComponents/uiHeaders/AccountHeader';
import UpdateUserData from './updateUserData.component';

const PersonalDataSettings = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();
  
  const handleBackButton = () => {
    navigate('/profile-settings-page');
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-start ${
        isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'
      }`}>
         <div
        className='w-full pl-8 pr-8 mb-4'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <IoArrowBack
          className={`h-8 w-8 mb-6 mt-6 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
          onClick={handleBackButton}
        />
      </div>
      <AccoundHeader text={'DANE OSOBISTE'} />
      <div className='w-full relative min-h-screen flex flex-col items-center justify-start mb-40'>
      <UpdateUserData />
      </div>
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default PersonalDataSettings;
