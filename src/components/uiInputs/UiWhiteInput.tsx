import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkModeAtom';
import { Cities, EducationLevel, EducationMethod, EducationType } from '../../constans/PersonalDataSettings.Constans';
import { Slider } from 'rsuite';
import './styles.css';
import './slider.less';

interface CustomInputProps {
  backgroundText: string;
  type: string;
  labelText: string;
}

const UiWhiteInput: React.FC<CustomInputProps> = ({
  backgroundText,
  type,
  labelText,
}) => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [price, setPrice] = useState<number>(0);
  const [descriptionText, setDescriptionText] = useState<string>('');

  const handleSliderChange = (value: number | [number, number] | undefined) => {
    if (typeof value === 'number') {
      setPrice(value);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setPrice(value);
    }
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(event.target.value);
  };

  return (
    <div className='w-[70%]'>
      <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        {labelText}
      </label>
      {type === 'text' ? (
        <input
          className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
          placeholder={backgroundText}
        />
      ) : type === 'slider' ? (
        <div className='flex flex-row items-center w-full'>
          <div className='w-[80%]'>
            <Slider
              progress
              value={price}
              max={200}
              onChange={handleSliderChange}
            />
          </div>
          <input
            type='text'
            className={`border-2 border-black w-[15%] h-[50px] rounded-3xl ml-[4%] ${
              isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
            }`}
            style={{ textAlign: 'center'}}
            value={price}
            onChange={handleInputChange}
            maxLength={3}
          />
        </div>
      ) : type === 'description' ? (
        <div className=' w-full relative'>
          <textarea
            className={`border-2 border-black w-full h-[150px] rounded-3xl mb-[20%] p-4  ${
              isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
            }`}
            placeholder={backgroundText}
            onChange={handleTextAreaChange}
            maxLength={150}
          />
          <a className={`absolute bottom-20 right-4 ${isDarkMode ? 'text-white' : 'text-black'} countText`}>
            {descriptionText.length}/150
          </a>
        </div>
      ) : (
        <select
          className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
        >
          {type === 'selectEduLevel' &&
            (EducationLevel)?.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          {type === 'selectEduMethod' &&
            (EducationMethod)?.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          {type === 'selectEduType' &&
            (EducationType)?.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          {type === 'selectCities' &&
            (Cities)?.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default UiWhiteInput;
