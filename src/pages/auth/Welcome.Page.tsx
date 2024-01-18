import logo from '../../assets/Logo.png';
import LoginBackgroundComponent from '../../components/LoginBackground.Component';
import {FcGoogle} from 'react-icons/fc';
import { SiFacebook } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {

  const navigate = useNavigate();
  return (
    <>
      <div className='z-0'>
        <LoginBackgroundComponent />
      </div>
      <div className='absolute flex flex-col items-start justify-start w-full'>
        <div className='mt-40 mx-auto'>
          <div className='flex flex-col gap-2 min-h-screen p-10 w-full'>
            <button className='flex place-items-center h-14 w-80 mb-3 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-14 py-2 text-md font-semibold text-gray-800 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'>
              <SiFacebook className='w-8 h-8 text-blue-600'/>
              <span className='ml-3'>Continue with Facebook</span>
            </button>
            <button className='flex place-items-center h-14 w-80 mb-3 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-16 py-2 text-md font-semibold text-gray-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
              <FcGoogle className='w-8 h-8'/>
              <span className='ml-3'>Continue with Google</span>
            </button>
            <button className='flex place-items-center h-14 w-80 mb-3 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-16 py-2 text-md font-semibold text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
              <FaApple className='w-8 h-8'/>
              <span className='ml-3'>Continue with Apple</span>
            </button>
            <button className='flex place-items-center h-14 w-80 mb-3 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-16 py-2 text-md font-semibold text-gray-800 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'>
              <FaLinkedin className='w-8 h-8 text-blue-600'/>
              <span className='ml-3'>Continue with LinkedIn</span>
            </button>
            <button className='flex place-items-center h-14 w-64 mb-3 mx-auto bg-gray-200 border border-gray-500 rounded-lg shadow-md max-w-xs px-[30px] py-2 text-[16px] font-extrabold text-gray-800 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'
            onClick={(() => navigate('/login-by-email'))}
            >
              <MdAlternateEmail className='w-7 h-7' />
              <span className='ml-2'>Continue with E-mail</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
