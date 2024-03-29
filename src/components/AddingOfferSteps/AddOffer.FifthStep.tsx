import {useState} from 'react';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import AddOfferButtonUnSelected from '../uiComponents/uiButons/AddOfferButtonUnSelected';
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';
import {addOfferCiteis} from '../../atoms/AddOffer.Atom';
import AddOfferButtonSelected from '../uiComponents/uiButons/AddOfferButtonSelected';
import BreadCrumb from '../BreadCrumb';
import AddOfferNavigationButtons from '../uiComponents/uiButons/AddOffersNavigationButtons';
import {Cities} from '../../interfaces/Cities.Interface';
import CommonData from '../../services/common/Common.Selector';
import {IoIosSearch} from 'react-icons/io';

const AddOfferFifthStep = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [citiesData, setCitiesData] = useState<Cities[]>([]);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [cities, setCities] = useRecoilState(addOfferCiteis);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const citeisRes = await CommonData.getInputCities({inputValue});
        setCitiesData(citeisRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClearSubject = () => {
    setCities('');
  };

  return (
    <div className='w-[80%]'>
      <BreadCrumb />
      <p
        className={`flex text-xl font-jua font-semibold text-black pb-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        W Jakim <p className='text-[#D687F3] px-2'>Mieście</p> Uczysz?
      </p>
      {cities.length > 0 ? (
        <button
          className='w-full'
          onClick={handleClearSubject}>
          <AddOfferButtonSelected />
        </button>
      ) : (
        <></>
      )}
      <>
        <div className='relative flex items-center'>
          <input
            className={`relative w-full h-[50px] rounded-3xl mb-[8%] mx-auto my-auto flex
        text-start text-k2b font-bold text-[18px] pl-4 border-2
        ${
          isDarkMode
            ? 'bg-[#2B2B2B] border-black text-white'
            : 'bg-[#eaeaea] border-[#dadada] text-black'
        }`}
            onChange={handleInputChange}
          />
          <div
            className={`absolute right-4 top-3 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
            <IoIosSearch className='w-7 h-7' />
          </div>
        </div>
      </>
      <div
        className='flex w-64 mb-8'
        onClick={handleCollapse}>
        <div className='relative my-2 border-t-2 mt-3 border-gray-600 w-full' />
        {isCollapsed ? (
          <>
            <p
              className={`absolute text-gray-700 text-[15px] font-bold pl-2 right-16 ${
                isDarkMode
                  ? 'text-white bg-[#212121]'
                  : 'text-black bg-[#FAEFFF]'
              }`}>
              Rozwiń
            </p>
            <div
              className={`absolute right-10 text-[22px] ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              <MdKeyboardArrowDown />
            </div>
          </>
        ) : (
          <>
            <p
              className={`absolute text-gray-700 text-[15px] font-bold px-2 right-12 ${
                isDarkMode
                  ? 'text-white bg-[#212121]'
                  : 'text-black bg-[#FAEFFF]'
              }`}>
              Zwiń
            </p>
            <div
              className={`absolute right-8 text-[22px] ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              <MdKeyboardArrowUp />
            </div>
          </>
        )}
      </div>

      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div>
          {isCollapsed === false ? (
            <div>
              {citiesData.map((cityData, index) => (
                <AddOfferButtonUnSelected
                  key={index}
                  text={cityData.name}
                  citiId={cityData.id}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
      <AddOfferNavigationButtons />
    </div>
  );
};

export default AddOfferFifthStep;
