import React, { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import { Cities } from '../../constans/PersonalDataSettings.Constans';
import './styles.css';
import './slider.less';
import UserData from '../../services/User/UserData';
import { useAuth } from '../../atoms/Route.Atom';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';

const UpdateUserData = () => {
  const { session } = useAuth();
  const [isLoading, setisLoading] = useState<boolean>()
  const userId = session?.user.id
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  // const [priceRange, setPriceRange] = useState<number>(0);
  const [descriptionText, setDescriptionText] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    city: '',
    // educationLevel: '',
    // educationType: '',
    // educationMethod: '',
    // price: '',
    description: '',
  });

  // const handleSliderChange = (value: number | [number, number] | undefined) => {
  //   if (typeof value === 'number') {
  //     setPriceRange(value);
  //   }
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseFloat(event.target.value);
  //   if (!isNaN(value)) {
  //     setPriceRange(value);
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [event.target.name]: event.target.value,
  //     }));
  //   }
  // };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(event.target.value);
    setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
      }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  
    setFormData((updatedFormData) => {
      console.log(updatedFormData);
      return updatedFormData;
    });
  };
  const handleSubmit = async () => {
    setisLoading(true);
    const newData = {...formData};
    await UserData.updateUserData(newData, userId);
    setisLoading(false);
};   

  return (
    <div className='w-[70%]'>
        {isLoading ? (
        <LoadingSuspense />
      ) : (
        <form onSubmit={handleSubmit}>

      <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        Imię:
      </label>
        <input
          className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
          name='name'
          placeholder={'Jan'}
          onChange={handleChange}
        />
        <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        Nazwisko:
      </label>
        <input
          className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
          name='surname'
          placeholder={'Kowalski'}
          onChange={handleChange}
        />
        <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        Miasto:
      </label>
         <select
          className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
          name='city'
          onChange={handleChange}
        >
            {Cities.map((option) => (
              <option key={option.id} value={option.name} className={`bg-[#FFFFFF] text-black`}>
                {option.name}
              </option>
            ))}
        </select>
        {/* 
        <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        Typ Zajęć:
      </label>
        <select
          className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
          name='educationType'
          onChange={handleChange}
        >
            {EducationType.map((option) => (
              <option key={option.id} value={option.name} className={`bg-[#FFFFFF] text-black`}>
                {option.name}
              </option>
            ))}
        </select>
        <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        Forma Nauki:
      </label>
        <select
          className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
          name='educationMethod'
          onChange={handleChange}
        >
            {EducationMethod.map((option) => (
              <option key={option.id} value={option.name} className={`bg-[#FFFFFF] text-black`}>
                {option.name}
              </option>
            ))}
        </select>
        <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        Poziom Nauki:
      </label>
        <select
          className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
          name='educationLevel'
          onChange={handleChange}
        >
            {EducationLevel.map((option) => (
              <option key={option.id} value={option.name} className={`bg-[#FFFFFF] text-black`}>
                {option.name}
              </option>
            ))}
        </select>
        <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        Cena:
      </label>
        <div className='flex flex-row  items-center w-full'>
          <div className='w-[80%]'>
            <Slider
              progress
              value={priceRange}
              max={200}
              onChange={handleSliderChange}
              className='border-2 border-[#ababab] rounded-3xl'
            />
          </div>
          <input
            type='text'
            className={`border-2 border-black w-[50px] h-[50px] rounded-3xl ml-[4%] ${
              isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
            }`}
            name='price'
            style={{ textAlign: 'center'}}
            value={priceRange}
            onChange={handleInputChange}
            maxLength={3}
          />
        </div> */}
        <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        Opis:
      </label>
        <div className=' w-full h-[150px] relative'>
          <textarea
            className={`border-2 border-black w-full h-full rounded-3xl p-4  ${
              isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
            }`}
            onChange={handleTextAreaChange}
            maxLength={150}
            name='description'
          />
          <p className={`absolute bottom-2 right-4 ${isDarkMode ? 'text-white' : 'text-black'} countText`}>
            {descriptionText.length}/150
          </p>
        </div>
        <button
          className='bg-[#ccabd8] border-2 border-black w-[90%] h-[50px] ml-[5%] rounded-3xl mt-[8%]'
          type='submit'>
          Zapisz
        </button>
        </form>
        )}
    </div>
  );
};

export default UpdateUserData;