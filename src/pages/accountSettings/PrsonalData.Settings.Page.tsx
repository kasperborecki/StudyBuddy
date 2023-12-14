import {useRecoilState} from 'recoil';
import BottomBar from '../../components/bottomBar/BottomBar';
import UiGradienButtonLong from '../../components/uiButons/UIGradientButtonLong';
import supabase from '../../config/SupabaseClient';
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

  const handleLogOut = async () => {
    let {error} = await supabase.auth.signOut();
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
        <IoArrowBack
          className={`h-8 w-8 mb-6 mt-10 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
          onClick={handleBackButton}
        />
      </div>
      <AccoundHeader text={'DANE OSOBISTE'} />
      <UiWhiteInput backgroundText={'Jan'} labelText={'Imie:'} type={'text'}/>
      <UiWhiteInput backgroundText={'Kowalski'} labelText={'Nazwisko:'} type={'text'}/>
      <UiWhiteInput backgroundText={'Warszawa'} labelText={'Miasto:'} type={'select'}/>
      <UiWhiteInput backgroundText={'Szkoła Podstawowa'} labelText={'Poziom Nauczania:'} type={'select'}/>
      <UiWhiteInput backgroundText={'Online'} labelText={'Forma Nauki:'} type={'select'}/>
      <UiWhiteInput backgroundText={'Indywidualne'} labelText={'Typ Zajęć:'} type={'select'}/>
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default PersonalDataSettings;
