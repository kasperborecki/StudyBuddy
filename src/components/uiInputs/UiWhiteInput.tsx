import React from 'react';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkModeAtom';
import { Cities, EducationLevel, EducationMethod, EducationType, eduTypes } from '../../constans/PersonalDataSettings.Constans';
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

  // const eduTypes = EducationType.map(
  //   item => ({ label: item, value: item })
  // );

  // const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  //   item => ({ label: item, value: item })
  // );

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
      ) : (
//     <Slider
//       progress
//       defaultValue={50}
//       max={200}
//       onChange={value => {
//         console.log(value);
//       }}
//     />
    <></>
      //   <select
      //     className={`border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
      //       isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
      //     }`}
      //   >
      //     {type === 'selectEduLevel' &&
      //       (EducationLevel)?.map((option) => (
      //         <option key={option.id} value={option.name}>
      //           {option.name}
      //         </option>
      //       ))}
      //       {type === 'selectEduMethod' &&
      //       (EducationMethod)?.map((option) => (
      //         <option key={option.id} value={option.name}>
      //           {option.name}
      //         </option>
      //       ))}
      //       {type === 'selectEduType' &&
      //       (EducationType)?.map((option) => (
      //         <option key={option.id} value={option.name}>
      //           {option.name}
      //         </option>
      //       ))}
      //       {type === 'selectCities' &&
      //       (Cities)?.map((option) => (
      //         <option key={option.id} value={option.name}>
      //           {option.name}
      //         </option>
      //       ))}
      //   </select>
      )}
    </div>
  );
};

export default UiWhiteInput;
