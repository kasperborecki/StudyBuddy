import {useNavigate} from 'react-router-dom';
import {RxCross2} from 'react-icons/rx';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {addOfferPageAtom} from '../../atoms/AddOfferPage.Atom';
import AddOfferTenthStep from '../../components/addingOfferSteps/AddOffer.TenthStep';
import AddOfferNinthStep from '../../components/addingOfferSteps/AddOffer.NinthStep';
import AddOfferEighthStep from '../../components/addingOfferSteps/AddOffer.EightStep';
import AddOfferSeventhStep from '../../components/addingOfferSteps/AddOffer.SeventhStep';
import AddOfferSixthStep from '../../components/addingOfferSteps/AddOffer.SIxthStep';
import AddOfferFifthStep from '../../components/addingOfferSteps/AddOffer.FifthStep';
import AddOfferFourthStep from '../../components/addingOfferSteps/AddOffer.FourthStep';
import AddOfferThirdStep from '../../components/addingOfferSteps/AddOffer.ThirdStep';
import AddOfferFirstStep from '../../components/addingOfferSteps/AddOffer.FirstStep';

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
        isDarkMode ? 'bg-[#212121]' : 'bg-[#FEECEB]'
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
      ) : page === 6 ? (
        <AddOfferSeventhStep />
      ) : page === 7 ? (
        <AddOfferEighthStep />
      ) : page === 8 ? (
        <AddOfferNinthStep />
      ) : (
        <AddOfferTenthStep />
      )}
    </div>
  );
};

export default AddOfferPage;
