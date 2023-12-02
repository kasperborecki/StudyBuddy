import {ChangeEvent, FormEvent, useState} from 'react';
import logo from '../../asets/Logo.png';
import {IoMdEye} from 'react-icons/io';
import {IoMdEyeOff} from 'react-icons/io';
import supabase from '../../config/SupabaseClient';
import {useNavigate} from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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
    console.log(formData);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (formData.password === formData.passwordSecond) {
      try {
        const {error} = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        // navigate('/');

        if (error) throw error;
      } catch (error) {
        console.error('Authentication error:', error);
      }
    }
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
      <form
        className='mt-[12%] w-screen flex flex-col items-center font-k2d font-bold'
        onSubmit={handleSubmit}>
        <div className='w-[80%]'>
          <label className='ml-4'>Email:</label>
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
            <div className='flex ml-5'>
              <input
                type='checkbox'
                id='rememberMe'
                className='w-4 h-4 mt-0.5 accent-purple-500'
              />
              <label
                htmlFor='rememberMe'
                className='ml-3'>
                Zapamiętaj mnie
              </label>
            </div>
          </div>
        </div>
        <button
          className='bg-[#ccabd8] border-2 border-black w-[50%] h-[50px] rounded-3xl mt-[8%]'
          type='submit'>
          ZAREJESTRUJ SIĘ
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
