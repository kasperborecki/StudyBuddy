import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkModeAtom';

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

  return (
    <div className='w-[70%]'>
      <label
        className={`block text-sm font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        {labelText}
      </label>
      {type == 'text' ? (
        <input
          className={` border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}
          placeholder={backgroundText}
        />
      ) : (
        <select className={` border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 ${
            isDarkMode ? 'bg-[#2B2B2B] text-white' : 'bg-[#FFFFFF] text-black'
          }`}>
          <option value='volvo'>Volvo</option>
          <option value='saab'>Saab</option>
          <option value='mercedes'>Mercedes</option>
          <option value='audi'>Audi</option>
        </select>
      )}
    </div>
  );
};

export default UiWhiteInput;
