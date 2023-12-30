import BottomBar from '../../components/bottomBar/BottomBar';
import profileBg from '../../assets/profileBg.png';
import avatar from '../../assets/WIN_20231211_14_27_19_Pro.jpg';
import stars from '../../assets/rating.png';
import {IoSettingsOutline} from 'react-icons/io5';
import icon1 from '../../assets/man.png';
import icon2 from '../../assets/security-guard.png';
import icon3 from '../../assets/bartender.png';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';

const ProfilePage = () => {
  const [isDarkMode, ] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();
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
  const handleSettingsClick = () => {
    navigate('/profile-settings-page')
  };

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-start ${isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'}`}>
        <img
        src={profileBg}
        alt='Profile Background'
        className='absolute w-full h-[40%] rounded-b-[66px]'
      />
      <p className='absolute font-k2d text-[20px] font-bold text-white pt-10'>
        Twój Profil
      </p>
      <div className='absolute rounded-full w-3 h-3 bg-red-700 top-[2.5%] right-[5%]' />
      <IoSettingsOutline className='absolute top-[3%] right-[5%] w-9 h-9' onClick={handleSettingsClick}/>
      <img
        src={avatar}
        alt='avatar'
        className='absolute w-[110px] h-[110px] rounded-[18px] mt-28 border-2 border-white'
      />
      <p className='absolute font-k2d text-[20px] text-black font-bold pt-60'>
        Kasper Borecki
      </p>
      <div className={`absolute h-[27%] w-[71%] mt-72 rounded-[37px] ${isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#FFFFFF]'}`}>
        <div className='flex flex-col items-center justify-center h-full'>
          <p className={` font-k2d text-[20px] font-bold my-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Ilość Zajęć :
          </p>
          <div className='w-[78px] h-[78px] bg-gradient-to-bl from-[#ffdd94] to-[#d687f3] rounded-full '>
            <div className={`w-[60px] h-[60px] rounded-full relative mt-[9px] mb-[9px] ml-[9px] ${isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#FFFFFF]'}`}>
              <p className={`absolute inset-0 flex items-center justify-center font-k2d text-[20px] font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                85
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <p className={`font-k2d text-[20px] font-bold mt-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Średnia Ocena :
            </p>
            <div className='flex items-center'>
              <img
                src={stars}
                alt='stars'
                className='w-[75px] h-[80px] ml-2'
              />
              <p className={`font-k2d text-[20px] font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                / 4.6
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute h-[14%] w-[90%] mt-[37rem] rounded-[30px] ${isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#FFFFFF]'}`}>
        <div className='flex flex-col items-start justify-center h-full'>
          <p className={`font-k2d text-[20px] font-bold my-2 text-center mx-auto ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Uczniowie
          </p>
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
                <p className={`font-k2d text-[16px] font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {tab.name}
                </p>
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
