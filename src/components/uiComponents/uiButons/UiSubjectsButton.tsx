import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import {DarkModeAtom} from '../../../atoms/DarkMode.Atom';
import {subjectIdAtom, subjectNameAtom} from '../../../atoms/Subject.Atom';


interface CustomButtonProps {
  text?: any;
  colour?: any;
  icon?: any;
  subjectId?: any;
  CDNURL?: string;
}

const UiWhiteButtonLong: React.FC<CustomButtonProps> = ({
  text,
  icon,
  subjectId,
  CDNURL,
}) => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [, setSubjectId] = useRecoilState(subjectIdAtom);
  const [, setSubjectName] = useRecoilState(subjectNameAtom);

  const navigate = useNavigate();

  const handleOfferPage = () => {
    setSubjectId(subjectId);
    setSubjectName(text);
    navigate('/offers');
  };

  return (
    <div
    className={`border-[8px] opacity-90 shadow-lg  w-36 h-36 mb-[8%] mx-auto my-auto flex items-center ${
      isDarkMode ? 'bg-[#6a2eb8] border-[#381566] shadow-[#381566]' : 'bg-[#e1e1e1] border-[#dddddd] shadow-[#cccccc]'
    }`}
    style={{borderRadius: '72% 28% 64% 36% / 42% 57% 43% 58%'}}
    >
    <div
      className={`border-[15px]  opacity-90 w-28 h-28 mb-[8%] mx-auto my-auto flex items-center ${
        isDarkMode ? 'bg-[#893Eff] border-[#8043e2]' : 'bg-[#ffffff] border-[#eeeeee]'
      }`}
      style={{borderRadius: '72% 28% 64% 36% / 42% 57% 43% 58%'}}
      onClick={handleOfferPage}>
        <div className='absolute ml-6 -mt-6 w-10 h-10 overflow-hidden'>
          <img
            src={CDNURL + icon}
            alt={icon}
            className='w-10 h-10'
          />
        </div>
      <div
        className='w-full h-full text-center text-k2b pt-14 font-bold text-[15px] text-black'>
        {text}
      </div>
    </div>
    </div>
  );
};

export default UiWhiteButtonLong;
