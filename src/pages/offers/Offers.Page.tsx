import {useNavigate} from 'react-router';
import BottomBar from '../../components/bottomBar/BottomBar';
import {IoArrowBack} from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import OfferCard from '../../components/offerCard/OfferCard.Component';

const OffersPage = () => {
  const [isDarkMode, ] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/');
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
      </div>
        <OfferCard />
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default OffersPage;
