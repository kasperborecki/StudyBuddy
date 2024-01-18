import {IoSchoolOutline} from 'react-icons/io5';
import {CiVial} from 'react-icons/ci';
import {CiCalculator1} from 'react-icons/ci';
import {BsGlobeAmericas} from 'react-icons/bs';
import {LuBookMarked} from 'react-icons/lu';
import {GoPencil} from 'react-icons/go';
import {RxDesktop} from 'react-icons/rx';
import {ImLab} from 'react-icons/im';
import {BiAtom} from 'react-icons/bi';
import {LuTreePine} from 'react-icons/lu';
import Background from '../assets/background.png';
import loginIcon from '../assets/LoginSreenIcon.png'


    // <IoSchoolOutline />
    // <CiVial />
    // <CiCalculator1 />
    // <BsGlobeAmericas />
    // <LuBookMarked />
    // <FaFlagUsa />
    // <GoPencil />
    // <RxDesktop />
    // <ImLab />
    // <BiAtom />
    // <LuTreePine />

  
  
  const LoginBackgroundComponent = () => {
    return (
        <>
        <div className='absolute z-0 w-full'>
        <img
          src={loginIcon}
          alt='Logo'
          className='w-full'
        />
      </div>
      </>
    );
  };
  

export default LoginBackgroundComponent;
