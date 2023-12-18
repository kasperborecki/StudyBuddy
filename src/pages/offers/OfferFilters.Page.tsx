import {useNavigate} from 'react-router';
import BottomBar from '../../components/bottomBar/BottomBar';
import {IoArrowBack} from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import UiWhiteButtonFilters from '../../components/uiComponents/uiButons/UiWhiteButtonFIlters';
import { educationLevel, educationMethod, educationType, price } from '../../atoms/FIlter.Atom';
import FilterModal from '../../components/modal/FilterModal.Component';
import { modalAtom } from '../../atoms/Modal.Atom';

const OfferFiltersPage = () => {
  const [isDarkMode, ] = useRecoilState(DarkModeAtom);
  const [isEducationLevel] = useRecoilState(educationLevel);
  const [isEducationType] = useRecoilState(educationType);
  const [isEducationMethod] = useRecoilState(educationMethod);
  const [isPrice] = useRecoilState(price);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useRecoilState<boolean>(modalAtom)

  const handleBackButton = () => {
    navigate('/offers');
  };
  console.log(isEducationType);
  
  let educationLevelColor = '';
  let educationTypeColor = '';
  let educationMethodColor = '';
  let priceColor = '';
  let informationType = 'educationType';

  if (isEducationLevel.length > 0) {
    educationLevelColor = '#363bf7';
  }
  if (isEducationType.length > 0) {
    educationTypeColor = '#363bf7';
  }
  if (isEducationMethod.length > 0) {
    educationMethodColor = '#363bf7';
  }
  if (isPrice.length > 0) {
    priceColor = '#363bf7';
  }

  const handleShowModal = () => {
    setShowModal(true);
  }

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
          className={`h-8 w-8 mb-6 mt-8 ${isDarkMode ? 'text-white' : 'text-black'}`}
          onClick={handleBackButton}
        />
      </div>
      <button onClick={handleShowModal} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Sortuj Według'}/>
        </button>
        <button onClick={handleShowModal} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Poziom Nauczania'} colour={educationLevelColor} />
        </button>
        <button onClick={handleShowModal} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Lokalizacja'} />
        </button>
        <button onClick={handleShowModal} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Forma Nauki'} colour={educationMethodColor} />
        </button>
        <button onClick={handleShowModal} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Średnia Ocen'} />
        </button>
        <button onClick={handleShowModal} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Dostępność Czasowa'} />
        </button>
        <button onClick={handleShowModal} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Typ Zajęć'} colour={educationTypeColor}/>
        </button>
        <button onClick={handleShowModal} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Cena'} colour={priceColor}/>
        </button>
        {showModal &&
        <FilterModal informationType={informationType}/> }
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default OfferFiltersPage;
