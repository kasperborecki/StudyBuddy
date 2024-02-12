import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {IoArrowBack} from 'react-icons/io5';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {RxCrossCircled} from 'react-icons/rx';
import {
  educationLevel,
  educationMethod,
  educationType,
  price,
} from '../../atoms/FIlter.Atom';
import FilterModal from '../../components/modal/FilterModal.Component';
import {modalAtom} from '../../atoms/Modal.Atom';
import {
  BasicSortingMetod,
  EducationLevel,
  EducationMethod,
} from '../../constans/PersonalDataSettings.Constans';
import { bottomBarClosed } from '../../atoms/BottomBarClosed.Atom';

const OfferFiltersPage = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isEducationLevel, setIsEducationLevel] =
    useRecoilState(educationLevel);
  const [isEducationType] = useRecoilState(educationType);
  const [isEducationMethod,setIsEducationMethod] = useRecoilState(educationMethod);
  const [isPrice, setIsPrice] = useRecoilState(price);
  const navigate = useNavigate();
  const [informationType, setInformationType] = useState('');
  const [highestPrice, setHighestPrice] = useState<number>(100);
  const [lowestPrice, setLowestPrice] = useState<number>(0);
  const [isRating, setIsRating] = useState<number>(5);
  const [selectedValueEduLevel, setSelectedValueEduLevel] =
    useState<string>('');
  const [selectedValueEduMethod, setSelectedValueEduMethod] =
    useState<string>('');
  const [selectedValueBasicSorting, setSelectedValueBasicSorting] =
    useState<string>('');
    const [, setShowModal] = useRecoilState<boolean>(modalAtom);
    const [, setIsBottomBarClosed] = useRecoilState(bottomBarClosed);
  
  
    const handleFilters = (type: any) => {
      setShowModal(false);
      setIsBottomBarClosed(false);
    };

  const handleBackButton = () => {
    navigate('/offers');
  };

  const handleEducationLevelChange = (option: any) => {
    setSelectedValueEduLevel(option.name);
    setIsEducationLevel((prevEducationLevel) => option.name);
  };

  const handleEducationMethodChange = (option: any) => {
    setSelectedValueEduMethod(option.name);
    setIsEducationMethod((prevEducationMethod) => option.name);
  };

  const handleBasicSortingChange = (option: any) => {
    setSelectedValueBasicSorting(option.name);
    // setIsB((prevBasicSorting => option.name);
  };

  const handlesetStarRating = (rating: any) => {
    setIsRating((prevRating) => rating);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-start rounded-t-3xl border-2 border-black ${
        isDarkMode ? 'bg-[#212121]' : 'bg-[#FAFFFF]'
      }`}>
      <div
        className='w-full pl-4 pr-6 mb-2'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <RxCrossCircled
          className={`h-8 w-8 mb-2 mt-8 ${
            isDarkMode ? 'text-white' : 'text-[#212427]'
          }`}
          onClick={handleFilters}
        />
        <button className="btn btn-sm btn-outline btn-error mt-7">Wyczyść filtry</button>
      </div>
      {/* 
      <button onClick={() => handleShowModal('localization')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Lokalizacja'} />
      </button>
      <button onClick={() => handleShowModal('rating')} className='w-[100%]'>
        <UiWhiteButtonFilters text={'Średnia Ocen'} />
      </button>
      {showModal && <FilterModal informationType={informationType} />}

      {/* Price Range Filter */}
      <button className="btn btn-success w-2/3 my-4 text-[#212427] text-lg">
        Wyszukaj Pasujące Oferty
        </button>

      <div className='w-full h-[950px] flex justify-around'>
        <p className='absolute left-4 text-xl font-bold text-[#212427]'>Cena</p>
        <div className='mt-10 mx-4 relative'>
          <p className='font-semibold'>Cena Min</p>
          <div className='flex'>
            <input
              className='flex w-full h-12 border border-gray-300 hover:border-black rounded-lg bg-white font-bold text-[#212427] text-lg text-right pr-12'
              value={lowestPrice}
              onChange={(event) => setLowestPrice(Number(event.target.value))}
            />
            <p className='absolute mt-2.5 right-2 font-bold text-lg text-[#212427]'>
              PLN
            </p>
          </div>
        </div>
        <div className='mt-10 mx-4 relative'>
          <p className='font-semibold'>Cena Max</p>
          <div className='flex'>
            <input
              className='flex w-full h-12 border border-gray-300 hover:border-black rounded-lg bg-white font-bold text-[#212427] text-lg text-right pr-12'
              value={highestPrice}
            />
            <p className='absolute mt-2.5 right-2 font-bold text-lg text-[#212427]'>
              PLN
            </p>
          </div>
        </div>
        <div className='absolute w-[80%] mt-32'>
          <input
            type='range'
            min={lowestPrice}
            max='500'
            value={highestPrice}
            className='range range-xs range-success h-3'
            onChange={(event) => setHighestPrice(Number(event.target.value))}
          />
          <div className='w-full flex justify-between text-md pt-2 font-semibold'>
            <span>| {lowestPrice}</span>
            <span>500 |</span>
          </div>
        </div>
      </div>

      {/* Sort By newest... */}
      <div className='absolute mt-[360px] left-6 '>
        <p className='text-xl font-bold text-[#212427] mb-4'>Sortuj Od</p>
        {BasicSortingMetod.map((option: any) => (
          <div
            key={option.name}
            className='flex items-center space-x-4 mb-4'>
            <input
              type='checkbox'
              checked={option.name === selectedValueBasicSorting}
              onChange={() => handleBasicSortingChange(option)}
              className='checkbox checkbox-success'
            />
            <div className='pl-2 font-k2d font-bold text-[16px]'>
              {option.name}
            </div>
          </div>
        ))}
      </div>

      {/* Education Level Filter */}
      <div className='absolute mt-[570px] left-6 '>
        <p className='text-xl font-bold text-[#212427] mb-4'>
          Poziom Nauczania
        </p>
        {EducationLevel.map((option: any) => (
          <div
            key={option.name}
            className='flex items-center space-x-4 mb-4'>
            <input
              type='checkbox'
              checked={option.name === selectedValueEduLevel}
              onChange={() => handleEducationLevelChange(option)}
              className='checkbox checkbox-success'
            />
            <div className='pl-2 font-k2d font-bold text-[16px]'>
              {option.name}
            </div>
          </div>
        ))}
      </div>

      {/* Education Method Filter */}
      <div className='absolute mt-[740px] left-6 '>
        <p className='text-xl font-bold text-[#212427] mb-4'>
          Mejsce Zajęć
        </p>
        {EducationMethod.map((option: any) => (
          <div
            key={option.name}
            className='flex items-center space-x-4 mb-4'>
            <input
              type='checkbox'
              checked={option.name === selectedValueEduMethod}
              onChange={() => handleEducationMethodChange(option)}
              className='checkbox checkbox-success'
            />
            <div className='pl-2 font-k2d font-bold text-[16px]'>
              {option.name}
            </div>
          </div>
        ))}
      </div>

      {/* Rting */}
      <div className='absolute mt-[910px] left-6'>
        <p className='text-xl font-bold text-[#212427] mb-4'>
          Średnia Ocen
        </p>
        <div className="rating">
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={(() => handlesetStarRating(1))}/>
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={(() => handlesetStarRating(2))}/>
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={(() => handlesetStarRating(3))}/>
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={(() => handlesetStarRating(4))}/>
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={(() => handlesetStarRating(5))}/>
        </div>
      </div>
      
    </div>
  );
};

export default OfferFiltersPage;
