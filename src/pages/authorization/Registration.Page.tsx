import {useState} from 'react';
import logo from '../../asets/Logo.png';
import UiPurpleButtonShort from '../../components/butons/UiPurpleButtonShort';
import UiPurpleInput from '../../components/inputs/UiPurpleInput';
import {IoMdEye} from 'react-icons/io';
import {IoMdEyeOff} from 'react-icons/io';

const RegistrationPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleShowHidePassword = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='flex flex-col items-center justify-start h-screen bg-gradient-to-tr from-[#D687F3] via-[#F6AA80] to-[#FFDD94]'>
      <div className='mt-[25%]'>
        <img
          src={logo}
          alt='Logo'
          className='w-[200px] h-[200px]'
        />
      </div>
      <div className='mt-[12%] w-screen flex flex-col items-center font-k2d font-bold'>
        <div className='w-[80%]'>
          <p className='ml-4'>Email:</p>
          <UiPurpleInput
            backgroundText={'Przykład@gmail.com'}
            isPassword={false}
          />
          <p className='ml-4'>Hasło:</p>
          <div className='relative'>
            <UiPurpleInput
              backgroundText={'Przykład123#'}
              isPassword={isVisible}
            />
            <button onClick={handleShowHidePassword} className='absolute top-3 right-5'>
              {isVisible ? <IoMdEyeOff className='w-6 h-6'/> : <IoMdEye className='w-6 h-6'/>}
            </button>
          </div>
          <p className='ml-4'>Powtórz Hasło:</p>
          <div className='relative'>
            <UiPurpleInput
              backgroundText={'Przykład123#'}
              isPassword={isVisible}
            />
            <button onClick={handleShowHidePassword} className='absolute top-3 right-5'>
              {isVisible ? <IoMdEyeOff className='w-6 h-6'/> : <IoMdEye className='w-6 h-6'/>}
            </button>
          </div>
        </div>
        <UiPurpleButtonShort text={'ZAREJESTRUJ SIĘ'} />
      </div>
    </div>
  );
};

export default RegistrationPage;
