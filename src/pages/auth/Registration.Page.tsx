import {ChangeEvent, FormEvent, useState} from 'react';
import logo from '../../assets/Logo.png';
import {IoMdEye} from 'react-icons/io';
import {IoMdEyeOff} from 'react-icons/io';
import supabase from '../../config/SupabaseClient';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {registeredUserEmail} from '../../atoms/RegistredUser.Atom';
import LoginBackgroundComponent from '../../components/LoginBackground.Component';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [, setRegisteredUser] = useRecoilState(registeredUserEmail);
  const [registerError, setRegisterError] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordSecond: '',
  });

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (formData.password === formData.passwordSecond) {
      try {
        const {error} = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        setRegisteredUser(formData.email);
        if (error) {
          setRegisterError(true);
        } else (navigate('/'))

        if (error) throw error;
      } catch (error) {
        console.error('Authentication error:', error);
      }
    }
  };

  return (
    <>
      <div className='z-0'>
        <LoginBackgroundComponent />
      </div>
      <div className='absolute flex flex-col items-start justify-start'>
        <div className='absolute mt-12 ml-8 text-white z-10'>
          <p className='text-xl'>Jesteś nowy?</p>
          <p className='text-4xl'>Zarejestruj się!</p>
        </div>
        <form
          className='mt-72 pt-8 flex flex-col items-center font-k2d font-bold h-[400px] w-full mx-11 z-10 rounded-xl'
          onSubmit={handleSubmit}>
          <div className='w-[80%]'>
            {/* <label className='ml-4'>Email:</label>
          <input
            className='bg-[#ccabd8] border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 focus:outline-none focus:border-purple-500'
            placeholder='Przykład@gmail.com'
            name='email'
            onChange={handleChange}
          />
          <label className='ml-4'>Hasło:</label>
          <div className='relative'>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              className='bg-[#ccabd8] border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 focus:outline-none focus:border-purple-500'
              placeholder='Przykład123!'
              name='password'
              onChange={handleChange}
            />
            <button
              type='button'
              onClick={handleTogglePasswordVisibility}
              className='absolute top-3 right-5'>
              {isPasswordVisible ? (
                <IoMdEye className='w-6 h-6' />
              ) : (
                <IoMdEyeOff className='w-6 h-6' />
              )}
            </button>
            <label className='ml-4'>Powtórz Hasło:</label>
            <div className='relative'>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className='bg-[#ccabd8] border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 focus:outline-none focus:border-purple-500'
                placeholder='Przykład123!'
                name='passwordSecond'
                onChange={handleChange}
              />
              <button
                type='button'
                onClick={handleTogglePasswordVisibility}
                className='absolute top-3 right-5'>
                {isPasswordVisible ? (
                  <IoMdEye className='w-6 h-6' />
                ) : (
                  <IoMdEyeOff className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>
          <button
          className='bg-[#ccabd8] border-2 border-black w-[50%] h-[50px] rounded-3xl mt-[8%]'
          type='submit'>
          ZAREJESTRUJ SIĘ
        </button> */}
            <div className='mb-4'>
              <div className='relative mb-6'>
                <input
                  id='email'
                  name='email'
                  type='text'
                  className={`border w-full h-9 shadow-lg py-1 focus:border-2  pl-2 rounded-lg transition-colors focus:outline-none peer bg-inherit text-black ${
                    registerError
                      ? 'border-[#ff0000] focus:border-[#ff0000]'
                      : 'border-gray-300 focus:border-[#893EFF]'
                  }`}
                  onChange={handleChange}
                />
                <label
                  className={`absolute left-0 top-1 cursor-text transition-all px-2 bg-white ${
                    formData.email
                      ? registerError
                        ? '-top-4 text-[#ff0000] ml-4'
                        : '-top-4 text-[#893EFF] ml-4'
                      : registerError
                      ? 'peer-focus:text-xs ml-2 mt-1'
                      : 'peer-focus:text-xs ml-2 mt-1'
                  } text-black`}>
                  Email
                </label>
              </div>
            </div>
            <div className='relative mb-6'>
                <input
                  id='password'
                  name='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  className={`border w-full h-9 shadow-lg py-1 focus:border-2  pl-2 rounded-lg transition-colors focus:outline-none peer bg-inherit text-black ${
                    registerError
                      ? 'border-[#ff0000] focus:border-[#ff0000]'
                      : 'border-gray-300 focus:border-[#893EFF]'
                  }`}
                  onChange={handleChange}
                />
                <label
                  className={`absolute left-0 top-1 cursor-text transition-all px-2 bg-white ${
                    formData.password
                      ? registerError
                        ? '-top-4 text-[#ff0000] ml-4'
                        : '-top-4 text-[#893EFF] ml-4'
                      : registerError
                        ? 'peer-focus:text-xs ml-2 mt-1'
                        : 'peer-focus:text-xs ml-2 mt-1'
                  } text-black`}>
                  Password
                </label>
                <button
                  type='button'
                  onClick={handleTogglePasswordVisibility}
                  className='absolute top-1.5 right-1 cursor-pointer'>
                  {isPasswordVisible ? (
                    <IoMdEye className='w-6 h-6' />
                  ) : (
                    <IoMdEyeOff className='w-6 h-6' />
                  )}
                </button>
              </div>
              <div className='relative mb-6'>
                <input
                  id='passwordSecond'
                  name='passwordSecond'
                  type={isPasswordVisible ? 'text' : 'password'}
                  className={`border w-full h-9 shadow-lg py-1 focus:border-2  pl-2 rounded-lg transition-colors focus:outline-none peer bg-inherit text-black ${
                    registerError
                      ? 'border-[#ff0000] focus:border-[#ff0000]'
                      : 'border-gray-300 focus:border-[#893EFF]'
                  }`}
                  onChange={handleChange}
                />
                <label
                  className={`absolute left-0 top-1 cursor-text transition-all px-2 bg-white ${
                    formData.passwordSecond
                      ? registerError
                        ? '-top-4 text-[#ff0000] ml-4'
                        : '-top-4 text-[#893EFF] ml-4'
                      : registerError
                        ? 'peer-focus:text-xs ml-2 mt-1'
                        : 'peer-focus:text-xs ml-2 mt-1'
                  } text-black`}>
                  Password
                </label>
                {registerError ? (
                  <p className='text-[#ff0000] text-[11px] absolute mt-4'>
                    Ops! Coś poszło nie tak, sprawdź ponownie hasło i e-mail.
                  </p>
                ) : null}
                <button
                  type='button'
                  onClick={handleTogglePasswordVisibility}
                  className='absolute top-1.5 right-1 cursor-pointer'>
                  {isPasswordVisible ? (
                    <IoMdEye className='w-6 h-6' />
                  ) : (
                    <IoMdEyeOff className='w-6 h-6' />
                  )}
                </button>
              </div>
          </div>
          <button
            className='w-60 bg-[#893EFF] h-[50px] mt-10 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden
            transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full
            before:w-full before:h-full before:bg-gradient-to-r before:from-[#58AD33] before:to-[#58AD33] before:transition-all
            before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'
            type='submit'>
            ZAREJESTRUJ SIĘ
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
