import {useNavigate} from 'react-router';
import BottomBar from '../../components/bottomBar/BottomBar';
import { RxCross2 } from "react-icons/rx";
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import AddOfferFirstStep from '../../components/AddingOfferSteps/AddOffer.FirstStep';

const AddOfferPage = () => {
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
        <RxCross2
          className={`h-8 w-8 mb-2 mt-8 ${isDarkMode ? 'text-white' : 'text-black'}`}
          onClick={handleBackButton}
        />
      </div>
      <AddOfferFirstStep />
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default AddOfferPage;
