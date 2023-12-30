import {useNavigate} from 'react-router';
import BottomBar from '../../components/bottomBar/BottomBar';
import {RxCross2} from 'react-icons/rx';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import AddOfferFirstStep from '../../components/AddingOfferSteps/AddOffer.FirstStep';
import {addOfferPageAtom} from '../../atoms/AddOfferPage.Atom';
import AddOfferThirdStep from '../../components/AddingOfferSteps/AddOffer.ThirdStep';
import AddOfferFourthStep from '../../components/AddingOfferSteps/AddOffer.FourthStep';
import AddOfferFifthStep from '../../components/AddingOfferSteps/AddOffer.FifthStep';
import AddOfferSixthStep from '../../components/AddingOfferSteps/AddOffer.SIxthStep';
import AddOfferSeventhStep from '../../components/AddingOfferSteps/AddOffer.SeventhStep';
import AddOfferEighthStep from '../../components/AddingOfferSteps/AddOffer.EightStep';
import AddOfferNinthStep from '../../components/AddingOfferSteps/AddOffer.NinthStep';
import AddOfferTenthStep from '../../components/AddingOfferSteps/AddOffer.TenthStep';

const AddOfferPage = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();
  const [page] = useRecoilState(addOfferPageAtom);

  const handleBackButton = () => {
    navigate('/');
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
        <RxCross2
          className={`h-8 w-8 mb-2 mt-8 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
          onClick={handleBackButton}
        />
      </div>
      {page === 1 ? (
        <AddOfferFirstStep />
      ) : page === 2 ? (
        <AddOfferThirdStep />
      ) : page === 3 ? (
        <AddOfferFourthStep />
      ) : page === 4 ? (
        <AddOfferFifthStep />
      ) : page === 5 ? (
        <AddOfferSixthStep />
      ): page === 6 ? (
        <AddOfferSeventhStep />
      ) : page === 7 ?(
        <AddOfferEighthStep />
      ) : page === 8 ?(
        <AddOfferNinthStep />
      ) : (
        <AddOfferTenthStep />
      )}
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default AddOfferPage;
