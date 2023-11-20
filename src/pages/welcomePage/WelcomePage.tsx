import logo from '../../asets/Logo.png';
import UiPurpleButtonLong from '../../components/butons/UiPurpleButtonLong';

const WelcomePage = () => {
  return (
    <div className='flex flex-col items-center justify-start h-screen bg-gradient-to-tr from-[#D687F3] via-[#F6AA80] to-[#FFDD94]'>
      <div className='mt-[25%]'>
        <img
          src={logo}
          alt='Logo'
          className='w-[200px] h-[200px]'
        />
      </div>
      <div className='mt-[12%] w-screen flex flex-col items-center'>
        <UiPurpleButtonLong text='WEJDŹ JAKO GOŚĆ' />
        <UiPurpleButtonLong text='ZALOGUJ SIĘ' />
        <UiPurpleButtonLong text='ZAREJESTRUJ SIĘ' />
      </div>
    </div>
  );
};

export default WelcomePage;
