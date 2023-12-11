import BottomBar from '../../components/bottomBar/BottomBar';
import profileBg from '../../assets/profileBg.png';
import avatar from '../../assets/WIN_20231211_14_27_19_Pro.jpg';
import stars from '../../assets/rating.png';
import {IoSettingsOutline} from 'react-icons/io5';
import icon1 from '../../assets/man.png';
import icon2 from '../../assets/security-guard.png';
import icon3 from '../../assets/bartender.png';

const ProfilePage = () => {
  const tabs = [
    {
      icon: (
        <img
          src={icon1}
          alt='home'
        />
      ),
      id: 0,
      name: 'Kasper',
    },
    {
      icon: (
        <img
          src={icon2}
          alt='chat'
        />
      ),
      id: 1,
      name: 'Michał',
    },
    {
      icon: (
        <img
          src={icon3}
          alt='Calendar'
        />
      ),
      id: 2,
      name: 'Adam',
    },
    {
      icon: (
        <img
          src={icon1}
          alt='user'
        />
      ),
      id: 3,
      name: 'Karol',
    },
  ];
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
      <div className='absolute rounded-full w-3 h-3 bg-red-700 top-[2.5%] right-[5%]' />
      <IoSettingsOutline className='absolute top-[3%] right-[5%] w-9 h-9' />
      <img
        src={avatar}
        alt='avatar'
        className='absolute w-[110px] h-[110px] rounded-[18px] mt-28 border-2 border-white'
      />
      <a className='absolute font-k2d text-[20px] text-black font-bold pt-60'>
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
              <a className='font-k2d text-[20px] font-bold text-black ml-2 '>
                / 4.6
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute h-[14%] w-[90%] bg-white mt-[37rem] rounded-[30px]'>
        <div className='flex flex-col items-start justify-center h-full'>
          <a className='font-k2d text-[20px] font-bold text-black my-2 text-center mx-auto'>
            Uczniowie
          </a>
          <div className='flex items-start mt-2'>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className='flex flex-col items-center ml-4'>
                <img
                  src={tab.icon.props.src}
                  alt={tab.name}
                  className='w-[45px] h-[45px] rounded-full mb-2 ml'
                />
                <a className='font-k2d text-[16px] font-bold text-black'>
                  {tab.name}
                </a>
              </div>
            ))}
            <button className=' bg-[#FFDD94] border-2 border-[#EBCA85] ml-4 font-bold font-k2d rounded-[10px] w-[90px] h-[25px] mt-3'>Zobacz</button>
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
