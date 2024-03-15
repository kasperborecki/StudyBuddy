import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../../atoms/DarkMode.Atom';
import {IoIosSearch} from 'react-icons/io';
import {IoFilter} from 'react-icons/io5';
import {modalAtom} from '../../../atoms/Modal.Atom';
import {bottomBarClosed} from '../../../atoms/BottomBarClosed.Atom';
import {useNavigate} from 'react-router';

const OfferSubHeader = () => {
  const navigate = useNavigate();
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [, setShowModal] = useRecoilState<boolean>(modalAtom);
  const [, setIsBottomBarClosed] = useRecoilState(bottomBarClosed);

  const handleFilters = (type: any) => {
    setShowModal(true);
    setIsBottomBarClosed(true);
  };

  const handleForum = () => {
    navigate('/forum');
  };

  return (
    <div className='relative flex justify-between w-[80%] h-12 mb-8 font-Roboto font-semibold'>
      <button
        className='w-[60%] h-12 text-lg border-solid border-2 border-slate-400 rounded-3xl p-1 font-semibold'
        onClick={handleForum}>
        <p
          className={` rounded-3xl font-medium text-[17px] ${
            isDarkMode ? 'text-[#dddddd] text-opacity-90' : 'text-[#4d4d4d]'
          }`}>
          Forum
        </p>
      </button>
      <button className='h-12 w-12 font-Roboto text-lg border-solid border-2 border-slate-400 rounded-3xl p-1'>
        <p
          className={` rounded-3xl font-medium text-[17px] ${
            isDarkMode ? 'text-[#dddddd] text-opacity-90' : 'text-[#4d4d4d]'
          }`}>
          <IoIosSearch className='h-7 w-7 mx-auto' />
        </p>
      </button>
      <button
        className='h-12 w-12 font-Roboto text-lg border-solid border-2 border-slate-400 rounded-3xl p-1'
        onClick={handleFilters}>
        <p
          className={` rounded-3xl font-medium text-[17px] ${
            isDarkMode ? 'text-[#dddddd] text-opacity-90' : 'text-[#4d4d4d]'
          }`}>
          <IoFilter className='h-7 w-7 mx-auto' />
        </p>
      </button>
    </div>
  );
};

export default OfferSubHeader;
