import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import { FaCheck } from 'react-icons/fa';

const SuccessPage = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);

  return (
    <div
      className={`relative min-h-screen flex flex-col justify-center items-center font-Roboto mx-auto ${
        isDarkMode ? 'bg-[#212121]' : 'bg-[#fcfcfc]'
      }`}
    >
      <p
        className={`text-[21px] font-semibold font-Roboto mt-8 ml-4 ${
          isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-[#727374]'
        }`}
      >
        Gratulacje wszystko się udało!
      </p>
      <div className='w-44 h-44 rounded-full bg-gray-300 bg-opacity-30 mb-6 shadow-lg shadow-bottom shadow-gray-200 mt-28 '>
        <div className='w-32 h-32 rounded-full bg-green-500 m-6 flex justify-center items-center'>
          <FaCheck className='h-16 w-16 text-white' />
        </div>
      </div>
      <p className={`px-20 text-center ${
          isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-[#727374]'
        }`}>Twoja oferta została dodana, przejdź do strony głównej.</p>
      <button
        className='mb-28 relative p-2 pb-2 flex justify-center items-center font-roboto font-semibold border-b-[3px] rounded-full border-green-500 mt-auto mx-[5%] w-[90%] h-10 font-Roboto text-lg border-solid border-2 text-green-500 '
      >
        Przejdź dalej
      </button>
    </div>
  );
};

export default SuccessPage;
