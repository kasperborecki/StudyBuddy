import BottomBar from '../../components/bottomBar/BottomBar';
import profileBg from '../../assets/profileBg.png';
import avatar from '../../assets/WIN_20231211_14_27_19_Pro.jpg';
import stars from '../../assets/rating.png';
import { IoSettingsOutline } from "react-icons/io5";

const ProfilePage = () => {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-start bg-[#FAEFFF]'>
      <img
        src={profileBg}
        alt='Profile Background'
        className='absolute w-full h-[40%] rounded-b-[66px]'
      />
      <a className='absolute font-k2d text-[20px] font-bold text-white pt-10'>
        Twój Profil
      </a>
      <div className='absolute rounded-full w-3 h-3 bg-red-700 top-[2.5%] right-[5%]'/>
      <IoSettingsOutline className='absolute top-[3%] right-[5%] w-9 h-9' />
      <img
        src={avatar}
        alt='avatar'
        className='absolute w-[110px] h-[110px] rounded-[18px] mt-28 border-2 border-white'
      />
      <a className='absolute font-k2d text-[20px] text-black pt-60'>
        Kasper Borecki
      </a>
      <div className='absolute h-[27%] w-[71%] bg-white mt-72 rounded-[37px]'>
        <div className='flex flex-col items-center justify-center h-full'>
          <a className='font-k2d text-[20px] font-bold text-black my-3'>
            Ilość Zajęć :
          </a>
          <div className='w-[78px] h-[78px] bg-gradient-to-bl from-[#ffdd94] to-[#d687f3] rounded-full '>
            <div className='w-[60px] h-[60px] bg-white rounded-full relative mt-[9px] mb-[9px] ml-[9px]'>
            <a className='absolute inset-0 flex items-center justify-center font-k2d text-[20px] font-bold text-black'>
              85
            </a>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <a className='font-k2d text-[20px] font-bold text-black mt-3'>
              Średnia Ocena :
            </a>
            <div className='flex items-center'>
              <img
                src={stars}
                alt='stars'
                className='w-[75px] h-[80px] ml-2'
              />
              <a className='font-k2d text-[20px] font-bold text-black ml-2 '>/ 4.6</a>
            </div>
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default ProfilePage;
