import {ChangeEvent, FormEvent, useState} from 'react';
import logo from '../../assets/Logo.png';
import {IoMdEye, IoMdEyeOff} from 'react-icons/io';
import supabase from '../../config/SupabaseClient';
import {useNavigate} from 'react-router-dom';
import LoginBackgroundComponent from '../../components/LoginBackground.Component';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
    setLoginError(false);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const {error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error === null) {
        navigate('/');
      } else {
        setLoginError(true);
      }

      if (error) throw error;
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <>
      <div className='z-0'>
        <LoginBackgroundComponent />
      </div>
      <div className='absolute flex flex-col items-start justify-start'>
        <div className='absolute mt-12 ml-8 text-white z-10'>
          <p className='text-xl'>Witaj Ponownie,</p>
          <p className='text-4xl'>Zaloguj się!</p>
        </div>
        <form
          className='mt-72 pt-8 flex flex-col items-center font-k2d font-bold h-[400px] w-full mx-11 z-10 rounded-xl'
          onSubmit={handleSubmit}>
          <div className='w-[80%]'>
            <div className='mb-4'>
              <div className='relative mb-6'>
                <input
                  id='email'
                  name='email'
                  type='text'
                  className={`border w-full h-9 shadow-lg py-1 focus:border-2  pl-2 rounded-lg transition-colors focus:outline-none peer bg-inherit text-black ${
                    loginError
                      ? 'border-[#ff0000] focus:border-[#ff0000]'
                      : 'border-gray-300 focus:border-[#893EFF]'
                  }`}
                  onChange={handleChange}
                />
                <label
                  className={`absolute left-0 top-1 cursor-text transition-all px-2 bg-white ${
                    formData.email
                      ? loginError
                        ? '-top-4 text-[#ff0000] ml-4'
                        : '-top-4 text-[#893EFF] ml-4'
                      : loginError
                        ? 'peer-focus:text-xs ml-2 mt-1'
                        : 'peer-focus:text-xs ml-2 mt-1'
                  } text-black`}>
                  Email
                </label>
              </div>
              <div className='relative mb-6'>
                <input
                  id='password'
                  name='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  className={`border w-full h-9 shadow-lg py-1 focus:border-2  pl-2 rounded-lg transition-colors focus:outline-none peer bg-inherit text-black ${
                    loginError
                      ? 'border-[#ff0000] focus:border-[#ff0000]'
                      : 'border-gray-300 focus:border-[#893EFF]'
                  }`}
                  onChange={handleChange}
                />
                <label
                  className={`absolute left-0 top-1 cursor-text transition-all px-2 bg-white ${
                    formData.password
                      ? loginError
                        ? '-top-4 text-[#ff0000] ml-4'
                        : '-top-4 text-[#893EFF] ml-4'
                      : loginError
                        ? 'peer-focus:text-xs ml-2 mt-1'
                        : 'peer-focus:text-xs ml-2 mt-1'
                  } text-black`}>
                  Password
                </label>
                <p className='absolute mt-4 right-0 text-[10px] decoration-2'>
                  Zapomniałeś hasła?
                </p>
                {loginError ? (
                  <p className='text-[#ff0000] text-[11px] absolute mt-10'>
                    {' '}
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
          </div>
          <button
            className='w-60 bg-[#893EFF] h-[50px] mt-20 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden
            transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full
            before:w-full before:h-full before:bg-gradient-to-r before:from-[#58AD33] before:to-[#58AD33] before:transition-all
            before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'
            type='submit'>
            ZALOGUJ SIĘ
          </button>
        <p onClick={(() => navigate('/registration'))}>Nie masz jeszcze konta?</p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
