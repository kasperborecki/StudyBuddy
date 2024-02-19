import ProfileBackground from '../../assets/ProfileBg.jpg';
import avatar from '../../assets/WIN_20231211_14_27_19_Pro.jpg';
import stars from '../../assets/rating.png';
import {IoSettingsOutline} from 'react-icons/io5';
import icon1 from '../../assets/man.png';
import icon2 from '../../assets/security-guard.png';
import icon3 from '../../assets/bartender.png';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import RewardCabinet from '../../components/profInformationCards/RewardsCabinet.Omponent';
import HelpProgres from '../../components/profInformationCards/HelpProgres.Component';
import LessonCounter from '../../components/profInformationCards/LessonCounter.Component';

const ProfilePage = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
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
    navigate('/profile-settings-page');
  };

  return (
    <div
      className={`relative h-[1400px] flex flex-col items-center justify-start ${
        isDarkMode ? 'bg-[#212121]' : 'bg-[#fceeed]'
      }`}>
      <img
        src={ProfileBackground}
        alt='Profile Background'
        className='absolute w-full h-[350px] rounded-b-[66px]'
      />
      <div className='absolute z-20 rounded-full w-3 h-3 bg-red-700 top-[3%] right-[5%]' />
      <div className='absolute z-10 top-[3%] right-[5%] bg-gray-300 bg-opacity-60 w-12 h-12 rounded-full'>
        <IoSettingsOutline
          className='absolute top-[3%] right-[5%] w-9 h-9 mt-1 mr-0.5 text-[#212427]'
          onClick={handleSettingsClick}
        />
      </div>
      <div className='relative grid justify-items-center mx-[40%] w-full h-52 bg-white mt-[180px] shadow-md shadow-bottom rounded-b-3xl'>
          <div className='absolute z-10 w-[130px] h-[130px] bg-white rounded-full -mt-12'></div>
          <img
            src={avatar}
            alt='avatar'
            className='z-20 w-[110px] h-[110px] rounded-full border-8 border-white -mt-10'
          />
          <p className='absolute font-k2d text-[20px] text-[#212427] font-bold z-10 mt-20 '>
            Kasper Borecki
          </p>
          <p className='absolute font-k2d text-[14px] text-gray-300 z-10 mt-28 -ml-2'>
            kasper.borecki05@gmail.com
          </p>
        <button
          className='overflow-hidden absolute flex mx-auto mt-40 w-32 px-9 h-8 bg-[#212427] text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group'
          style={{left: '51%', transform: 'translateX(-50%)'}}>
          Edytuj
          <span className='absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left'></span>
          <span className='absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left'></span>
          <span className='absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left'></span>
          <span className='group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute left-9 z-10 '>
            Edytuj
          </span>
        </button>
      </div>
      {/* <div
        className={`absolute h-[27%] w-[71%] top-[50%] rounded-[37px] ${
          isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#FFFFFF]'
        }`}>
        <div className='flex flex-col items-center justify-center h-full'>
          <p
            className={` font-k2d text-[20px] font-bold my-3 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
            Ilość Zajęć :
          </p>
          <div className='w-[78px] h-[78px] bg-gradient-to-bl from-[#ffdd94] to-[#d687f3] rounded-full '>
            <div
              className={`w-[60px] h-[60px] rounded-full relative mt-[9px] mb-[9px] ml-[9px] ${
                isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#FFFFFF]'
              }`}>
              <p
                className={`absolute inset-0 flex items-center justify-center font-k2d text-[20px] font-bold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                85
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <p
              className={`font-k2d text-[20px] font-bold mt-3 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              Średnia Ocena :
            </p>
            <div className='flex items-center'>
              <img
                src={stars}
                alt='stars'
                className='w-[75px] h-[80px] ml-2'
              />
              <p
                className={`font-k2d text-[20px] font-bold ml-2 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                / 4.6
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute h-[14%] w-[90%] mt-[37rem] rounded-[30px] ${
          isDarkMode ? 'bg-[#2B2B2B]' : 'bg-[#FFFFFF]'
        }`}>
        <div className='flex flex-col items-start justify-center h-full'>
          <p
            className={`font-k2d text-[20px] font-bold my-2 text-center mx-auto ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
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
                <p
                  className={`font-k2d text-[16px] font-bold ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>
                  {tab.name}
                </p>
              </div>
            ))}
            <button className=' bg-[#FFDD94] border-2 border-[#EBCA85] ml-4 font-bold font-k2d rounded-[10px] w-[90px] h-[25px] mt-3'>
              Zobacz
            </button>
          </div>
        </div>
      </div> */}
      <RewardCabinet />
      <HelpProgres />
      <LessonCounter />
    </div>
  );
};

export default ProfilePage;
