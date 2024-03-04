import React, {ChangeEvent, useState} from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {Cities} from '../../constans/PersonalDataSettings.Constans';
import './styles.css';
import './slider.less';
import UserData from '../../services/User/UserData';
import {useAuth} from '../../atoms/Route.Atom';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import {Slider} from 'rsuite';

const UpdateUserData = () => {
  const {session} = useAuth();
  const [isLoading, setisLoading] = useState<boolean>();
  const userId = session?.user.id;
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [experienceRange, setExperienceRange] = useState<number>(0);
  const [descriptionText, setDescriptionText] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    city: '',
    description: '',
  });

  const handleSliderChange = (value: number | [number, number] | undefined) => {
    if (typeof value === 'number') {
      setExperienceRange(value);
    }
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescriptionText(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));

    setFormData((updatedFormData) => {
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
          <div className='info-panels'>
            <div className='input-color-group-one'>
              <input
                className='input-color'
                name='name'
                type='text'
                placeholder='Jan'
                onChange={handleChange}
              />
              <label className='color-label'>Imię</label>
            </div>
          </div>
          <div className='info-panels mt-8'>
            <div className='input-color-group-one'>
              <input
                className='input-color'
                name='surname'
                type='text'
                placeholder='Kowalski'
                onChange={handleChange}
              />
              <label className='color-label'>Nazwisko</label>
            </div>
          </div>
          <div className='info-panels mt-8'>
            <div className='input-color-group-one'>
              <input
                className='input-color'
                name='city'
                type='text'
                placeholder='Kowalski'
                onChange={handleChange}
              />
              <label className='color-label'>Miasto</label>
            </div>
          </div>
          <div className='info-panels mt-8  mb-4'>
            <div className='input-color-group-one'>
              <input
                className='input-color'
                name='city'
                type='text'
                placeholder='Uniwersytet Warszawski'
                onChange={handleChange}
              />
              <label className='color-label'>Ukończona szkoła i doświadcznie</label>
            </div>
          </div>
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
          <div className='w-full'>
            <input
              type='range'
              min='0'
              max='10'
              // value={experienceRange}
              className='range range-success'
              step='1'
            />
            <div className='w-full flex justify-between text-xs px-2 font-semibold'>
              <span className='text-[14px]'>1</span>
              <span className='text-[14px]'>2</span>
              <span className='text-[14px]'>3</span>
              <span className='text-[14px]'>4</span>
              <span className='text-[14px]'>5</span>
              <span className='text-[14px]'>6</span>
              <span className='text-[14px]'>7</span>
              <span className='text-[14px]'>8</span>
              <span className='text-[14px]'>9</span>
              <span className='text-[14px]'>10+</span>
            </div>
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
