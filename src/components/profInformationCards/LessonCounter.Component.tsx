import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import stars from '../../assets/rating.png';

const LessonCounter = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);

  return (
    <div className='relative grid justify-items-center w-[90%] bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 p-[2px] h-[240px] rounded-lg mt-12'>
      <div className='relative flex-col grid justify-items-center w-full h-full bg-white rounded-lg'>
        <p className='text-[#212427] text-[20px] font-k2d font-semibold mt-2'>
          Ilość Zajęć :
        </p>
        <div className='w-[78px] h-[78px] bg-gradient-to-bl from-yellow-500 via-pink-500 to-red-500 rounded-full '>
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
        <p className='text-[#212427] text-[20px] font-k2d font-semibold mt-2'>
          Średnia Ocen
        </p>
        <div className='flex flex-row'>
          <img
            src={stars}
            alt='stars'
            className='w-[75px] h-[80px] ml-2 -mt-3'
          />
          <p
            className={`font-k2d text-[20px] font-bold ml-2 mt-[15px] ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
            / 4.6
          </p>
        </div>
      </div>
    </div>
  );
};

export default LessonCounter;
