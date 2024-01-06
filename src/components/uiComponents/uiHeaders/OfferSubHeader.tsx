import {useNavigate} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../../atoms/DarkMode.Atom';
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";


const OfferSubHeader = () => {
  const navigate = useNavigate();
  const [isDarkMode] = useRecoilState(DarkModeAtom);

  const handleFilters = () => {
    navigate('/offers-filter')
  }

  
  return (
    <div className='relative flex justify-between w-[80%] h-12 mb-8'>
    <button
    className={`font-jua text-[20px] font-bold border-2 border-black w-[60%] h-12 rounded-3xl
    ${isDarkMode ? 'bg-[#2B2B2B] border-[#626262] text-white' : 'bg-[#FFFFFF] border-black text-black'}`}
    >
      FORUM
    </button>
    <button
    className={`font-bold border-2 border-black w-12 h-12 rounded-3xl
    ${isDarkMode ? 'bg-[#2B2B2B] border-[#626262] text-white' : 'bg-[#FFFFFF] border-black text-black'}`}
    >
      <IoIosSearch className='h-7 w-7 mx-auto'/>
    </button>
    <button
    className={`font-bold border-2 border-black w-12 h-12 rounded-3xl
    ${isDarkMode ? 'bg-[#2B2B2B] border-[#626262] text-white' : 'bg-[#FFFFFF] border-black text-black'}`}
    onClick={handleFilters}
    >
      <IoFilter className='h-7 w-7 mx-auto'/>
    </button>
    </div>
  );
};

export default OfferSubHeader;
