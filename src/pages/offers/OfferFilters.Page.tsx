import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import UiWhiteButtonFilters from '../../components/uiComponents/uiButons/UiFIltersFButton';
import { educationLevel, educationMethod, educationType, price } from '../../atoms/FIlter.Atom';
import FilterModal from '../../components/modal/FilterModal.Component';
import { modalAtom } from '../../atoms/Modal.Atom';

const OfferFiltersPage = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isEducationLevel] = useRecoilState(educationLevel);
  const [isEducationType] = useRecoilState(educationType);
  const [isEducationMethod] = useRecoilState(educationMethod);
  const [isPrice] = useRecoilState(price);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useRecoilState<boolean>(modalAtom);
  const [informationType, setInformationType] = useState('');

  const handleBackButton = () => {
    navigate('/offers');
  };

  const handleShowModal = (type: any) => {
    setShowModal(true);
    setInformationType(type);
  };

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-start ${isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'}`}>
      <div className='w-full pl-8 pr-8 mb-4' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IoArrowBack
          className={`h-8 w-8 mb-6 mt-8 ${isDarkMode ? 'text-white' : 'text-black'}`}
          onClick={handleBackButton}
        />
      </div>
      <button onClick={() => handleShowModal('sortBy')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Sortuj Według'} />
      </button>
      <button onClick={() => handleShowModal('educationLevel')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Poziom Nauczania'} colour={isEducationLevel.length > 0 ? '#363bf7' : ''} />
      </button>
      <button onClick={() => handleShowModal('localization')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Lokalizacja'} />
      </button>
      <button onClick={() => handleShowModal('educationMethod')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Forma Nauki'} colour={isEducationMethod.length > 0 ? '#363bf7' : ''} />
      </button>
      <button onClick={() => handleShowModal('rating')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Średnia Ocen'} />
      </button>
      {/* Uncomment the button below if needed */}
      {/* <button onClick={() => handleShowModal('availability')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Dostępność Czasowa'} />
      </button> */}
      <button onClick={() => handleShowModal('educationType')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Typ Zajęć'} colour={isEducationType.length > 0 ? '#363bf7' : ''} />
      </button>
      <button onClick={() => handleShowModal('price')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Cena'} colour={isPrice.length > 0 ? '#363bf7' : ''} />
      </button>
      {showModal && <FilterModal informationType={informationType} />}
    </div>
  );
};

export default OfferFiltersPage;
