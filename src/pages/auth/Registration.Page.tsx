import {ChangeEvent, FormEvent, useState} from 'react';
import logo from '../../assets/Logo.png';
import {IoMdEye} from 'react-icons/io';
import {IoMdEyeOff} from 'react-icons/io';
import supabase from '../../config/SupabaseClient';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {registeredUserEmail} from '../../atoms/RegistredUser.Atom';
import LoginBackgroundComponent from '../../components/LoginBackground.Component';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import MailConfirmModal from '../../components/modal/MailConfirmModal.Component';
import { createClient } from '@supabase/supabase-js';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [, setRegisteredUser] = useRecoilState(registeredUserEmail);
  const [registerError, setRegisterError] = useState<boolean>(false);
  const [isModalShown, setIsModalShow] = useState<boolean>(false);

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
    setIsModalShow(true);
  };


  async function handleGoogleSignIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (data) {
      // console.log("data: ", data);
    }
    if (error) {
      // console.log("error: ", error);
    }
  }

return (
  <div className='bg-[#FFFFFF]'>
    {isModalShown ? <MailConfirmModal /> : null}
    <div className={` relative bg-[#295d13] ${isModalShown ? 'opacity-30' : ''} `} >
      <div className='absolute inset-0 z-0'>
        <LoginBackgroundComponent />
      </div>
      <div className='w-full h-[600px] mt-60 bg-[#DDDDDD] rounded-t-3xl absolute z-10 '>
        <p className='text-center text-[#212427b0] mt-3 text-lg font-bold'>Stwórz nowe konto</p>
      </div>
      <div className='w-full h-[640px] mt-72 bg-[#FFFFFF] rounded-t-3xl absolute z-10 '>
        <div className='flex flex-row gap-4 justify-between p-10 mt-5 px-24 w-full'>
          <button disabled={true} className='flex place-items-center h-14 w-14 mb-3 bg-white border border-gray-300 rounded-full shadow-md max-w-xs px-3 py-2 text-md font-semibold text-gray-800 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'>
            <SiFacebook className='w-8 h-8 text-blue-600'/>
          </button>
          <button className='flex place-items-center h-14 w-14 mb-3 bg-white border border-gray-300 rounded-full shadow-md max-w-xs px-3 py-2 text-md font-semibold text-gray-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
          onClick={handleGoogleSignIn}>
            <FcGoogle className='w-8 h-8'/>
          </button>
          <button disabled={true} className='flex place-items-center h-14 w-14 mb-3 bg-white border border-gray-300 rounded-full shadow-md max-w-xs px-3 py-2 text-md font-semibold text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
            <FaApple className='w-8 h-8'/>
          </button>
        </div>
        <div>
        <hr className='flex absolute top-[15%] flex-col w-[90%] z-10 h-[1px] bg-[#00000060] mx-5 mt-12'/>
          <p className='flex absolute top-[15%] flex-col z-20 h-4 w-12 px-2.5 bg-[#FFFFFF] mx-[44%] text-[#212427] font-semibold mt-9 text-[17px]'>LUB</p>
          </div>
        <form
            className='pt-8 flex absolute top-[15%] flex-col items-center font-k2d font-bold h-[400px] w-full z-10 rounded-xl mt-16'
            onSubmit={handleSubmit}>
          <div className='w-[80%]'>
            <div className='mb-4'>
              <div className='relative mb-6'>
                <input
                  id='email'
                  name='email'
                  type='text'
                  className={`border w-full h-9 shadow-lg py-1 focus:border-2  pl-2 rounded-lg transition-colors focus:outline-none peer bg-inherit text-[#212427] ${
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
                  } text-[#212427]`}>
                  Email
                </label>
              </div>
            </div>
            <div className='relative mb-6'>
                <input
                  id='password'
                  name='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  className={`border w-full h-9 shadow-lg py-1 focus:border-2  pl-2 rounded-lg transition-colors focus:outline-none peer bg-inherit text-[#212427] ${
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
                  } text-[#212427]`}>
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
                  className={`border w-full h-9 shadow-lg py-1 focus:border-2  pl-2 rounded-lg transition-colors focus:outline-none peer bg-inherit text-[#212427] ${
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
                  } text-[#212427]`}>
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
          <p onClick={() => navigate('/')}>
            Masz już konto?
          </p>
        </form>
      </div>
    </div>
  </div>
);
};

export default RegistrationPage;
