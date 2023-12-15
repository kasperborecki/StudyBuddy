import {useRecoilState} from 'recoil';
import BottomBar from '../../components/bottomBar/BottomBar';
import {DarkModeAtom} from '../../atoms/DarkModeAtom';
import {useNavigate} from 'react-router';
import {IoArrowBack} from 'react-icons/io5';
import AccoundHeader from '../../components/uiHeaders/AccountHeader';
import UiWhiteInput from '../../components/uiInputs/UiWhiteInput';

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
          className={`h-8 w-8 mb-6 mt-10 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
          onClick={handleBackButton}
        />
      </div>
      <AccoundHeader text={'DANE OSOBISTE'} />
      <div className='w-full relative min-h-screen flex flex-col items-center justify-start mb-12'>
      <UiWhiteInput backgroundText={'Jan'} labelText={'Imie:'} type={'text'}/>
      <UiWhiteInput backgroundText={'Kowalski'} labelText={'Nazwisko:'} type={'text'}/>
      <UiWhiteInput backgroundText={'Warszawa'} labelText={'Miasto:'} type={'selectCities'}/>
      <UiWhiteInput backgroundText={'Szkoła Podstawowa'} labelText={'Poziom Nauczania:'} type={'selectEduLevel'} />
      <UiWhiteInput backgroundText={'Online'} labelText={'Forma Nauki:'} type={'selectEduMethod'} />
      <UiWhiteInput backgroundText={'Indywidualne'} labelText={'Typ Zajęć:'} type={'selectEduType'}/>
      <UiWhiteInput backgroundText={''} labelText={'Cena:'} type={'slider'}/>
      <UiWhiteInput backgroundText={''} labelText={'Opis:'} type={'description'}/>
      </div>
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default PersonalDataSettings;
