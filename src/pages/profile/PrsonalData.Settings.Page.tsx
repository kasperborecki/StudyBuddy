import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import AccoundHeader from '../../components/uiComponents/uiHeaders/AccountHeader';
import UpdateUserData from '../../components/userManagement/updateUserData.component';

const PersonalDataSettings = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/profile');
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-start ${
        isDarkMode ? 'bg-[#212121] text-white' : 'bg-[#FAEFFF] text-black'
      }`}
    >
      <div className='w-full pl-8 pr-8 mb-4 flex justify-between items-center'>
        <IoArrowBack
          className={`h-8 w-8 mt-6`}
          onClick={handleBackButton}
        />
        <div className='w-full flex justify-center'>
          <p className='text-[22px] font-semibold mt-6'>Dane Osobiste</p>
        </div>
      </div>
      <div className='w-full relative items-center'>
        <UpdateUserData />
      </div>
    </div>
  );
};

export default PersonalDataSettings;
