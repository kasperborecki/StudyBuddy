import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {addOfferPrice} from '../../atoms/AddOffer.Atom';
import BreadCrumb from '../BreadCrumb';
import AddOfferNavigationButtons from '../uiComponents/uiButons/AddOffersNavigationButtons';
import {Slider} from 'rsuite';
import {FiPlus} from 'react-icons/fi';
import {LuMinus} from 'react-icons/lu';

const AddOfferSeventhStep = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [, setPrice] = useRecoilState(addOfferPrice);
  const [inputPrice, setInputPrice] = useState(100);

  const handlePlus = () => {
    if (inputPrice < 500) {
      setInputPrice((prevPrice) => prevPrice + 10);
      setPrice(inputPrice);
    }
  };

  const handleMinus = () => {
    if (inputPrice > 10) {
      setInputPrice((prevPrice) => prevPrice - 10);
      setPrice(inputPrice);
    }
  };

  return (
    <div className='w-[80%]'>
      <BreadCrumb />
      <p
        className={`flex text-xl font-jua font-semibold text-black pb-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        Zaznacz <p className='text-[#D687F3] px-2'>Czas</p> Trwania Zajęć:
      </p>
      <div>
        <div className='mb-8'>
          <Slider
            defaultValue={100}
            value={inputPrice}
            max={500}
            step={10}
            min={15}
            progress
            onChange={(value) => {
              setInputPrice(value);
              setPrice(value);
            }}
          />
          <div className='py-4 mt-4 flex items-center justify-center'>
            <div className='flex items-center gap-x-1.5'>
              <button
                type='button'
                className={`w-9 h-9 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border-2 shadow-sm
          ${
            isDarkMode
              ? 'bg-[#2B2B2B] text-white border-[#1a1a1a]'
              : 'bg-white border-[#dadada] text-black'
          }`}
                onClick={handleMinus}>
                <LuMinus />
              </button>
              <input
                className={`p-0 w-9 bg-transparent border-0 text-center font-bold
    ${isDarkMode ? 'text-white' : 'text-black'} `}
                type='number'
                value={inputPrice}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setInputPrice(value);
                  setPrice(value);
                }}
              />
              <p
                className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-black'
                } `}>
                PLN
              </p>
              <button
                type='button'
                className={`w-9 h-9 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border-2 shadow-sm
          ${
            isDarkMode
              ? 'bg-[#2B2B2B] text-white border-[#1a1a1a]'
              : 'bg-white border-[#dadada] text-black'
          }`}
                onClick={handlePlus}>
                <FiPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddOfferNavigationButtons />
    </div>
  );
};

export default AddOfferSeventhStep;
