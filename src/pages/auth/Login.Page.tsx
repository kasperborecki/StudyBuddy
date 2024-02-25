import {ChangeEvent, FormEvent, useState} from 'react';
import {IoMdEye, IoMdEyeOff} from 'react-icons/io';
import supabase from '../../config/SupabaseClient';
import {useNavigate} from 'react-router-dom';
import LoginBackgroundComponent from '../../components/LoginBackground.Component';
import {FcGoogle} from 'react-icons/fc';
import {SiFacebook} from 'react-icons/si';

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
    const {name, value} = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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

  async function handleGoogleSignIn() {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (data) {
      // console.log("data: ", data);
    }
    if (error) {
      // console.log("error: ", error);
    }
  }

  return (
    <div className='bg-[#FFFFFF]  h-screen'>
      <div className=' absolute inset-0 z-0 pt-[30px] bg-[#FFFFFF]'>
        <LoginBackgroundComponent />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mt-[250px] relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl bg-opacity-0'>
          <div className=' flex justify-center self-center z-10'>
            <div className='p-12 mx-auto rounded-3xl w-96'>
              <div className='mb-7'>
                <h3 className='font-semibold text-2xl text-gray-800'>
                  Zaloguj się
                </h3>
                <p className='text-gray-400'>
                  Nie masz jeszcze kont?{' '}
                  <a
                    className='text-sm text-purple-700 hover:text-purple-700'
                    onClick={() => navigate('/registration')}>
                    Zarejestruj się
                  </a>
                </p>
              </div>
              <div className='space-y-6'>
                <div className=''>
                  <input
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400'
                    type='text'
                    placeholder='Email'
                  />
                </div>
                <div
                  className='relative'
                  data-x-data='{ show: true }'>
                  <input
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Hasło'
                    type={isPasswordVisible ? 'text' : 'password'}
                    className='text-sm text-blac px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400'
                  />
                  <div className='flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5'>
                    <button
                      type='button'
                      onClick={handleTogglePasswordVisibility}
                      className='absolute top-3.5 right-2 cursor-pointer'>
                      {isPasswordVisible ? (
                        <IoMdEye className='w-5 h-5 text-purple-600' />
                      ) : (
                        <IoMdEyeOff className='w-5 h-5 text-purple-600' />
                      )}
                    </button>
                  </div>
                </div>
                <div className=''>
                  <button
                    className='w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg text-sm'
                    type='submit'>
                    Zaloguj się
                  </button>
                </div>
              </div>
              <div className='flex justify-center space-x-6 mt-6'>
                <button
                  onClick={handleGoogleSignIn}
                  className='flex justify-center items-center w-full py-3 text-black hover:text-white bg-white border-[2px] border-red-600 hover:bg-red-700 rounded-lg text-sm'>
                  <FcGoogle className='text-xl mr-2' />
                  Google
                </button>
                <button className='flex justify-center items-center w-full py-3 text-black hover:text-black border-[2px] border-blue-700 hover:bg-blue-700 rounded-lg text-sm'>
                  <SiFacebook className='text-xl mr-2 text-blue-600' />
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
