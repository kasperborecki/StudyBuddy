import {useNavigate} from 'react-router-dom';
import {IoArrowBack} from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import OfferCard from '../../components/offerCard/OfferCard.Component';
import OfferFiltersPage from './OfferFilters.Page';
import { modalAtom } from '../../atoms/Modal.Atom';


const OffersPage = () => {
  const [isDarkMode, ] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();
  const [showModal] = useRecoilState<boolean>(modalAtom);

  const handleBackButton = () => {
    navigate('/');
  };

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-start ${isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'}`}>
        <OfferCard />
        <div className='absolute mt-10'> 
        {showModal ? <OfferFiltersPage /> : null }
        </div>
    </div>
  );
};

export default OffersPage;
