import {FaArrowRight} from 'react-icons/fa';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router';
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
  colour,
  icon,
  subjectId,
  CDNURL,
}) => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [selectedSubjectId, setSubjectId] = useRecoilState(subjectIdAtom);
  const [subjectName, setSubjectName] = useRecoilState(subjectNameAtom);
  const navigate = useNavigate();

  const handleOfferPage = () => {
    setSubjectId(subjectId);
    setSubjectName(text);
    navigate('/offers');
  };

  return (
    <div
    className={`border-[8px] border-[#381566] opacity-90 shadow-lg shadow-[#381566] w-36 h-36 mb-[8%] mx-auto my-auto flex items-center ${
      isDarkMode ? 'bg-[#6a2eb8] ' : 'bg-[#6a2eb8] '
    }`}
    style={{borderRadius: '72% 28% 64% 36% / 42% 57% 43% 58%'}}
    >
    <div
      className={`border-[15px] border-[#8043e2] opacity-90 w-28 h-28 mb-[8%] mx-auto my-auto flex items-center ${
        isDarkMode ? 'bg-[#893Eff] ' : 'bg-[#893Eff] '
      }`}
      style={{borderRadius: '72% 28% 64% 36% / 42% 57% 43% 58%'}}
      onClick={handleOfferPage}>
        <div className='absolute ml-6 -mt-8 w-10 h-10 overflow-hidden'>
          <img
            src={CDNURL + icon}
            alt={icon}
            className='w-10 h-10'
          />
        </div>
      <div
        // style={{color: colour}}
        className='w-full h-full text-center text-k2b pt-12 font-bold text-[15px] text-black'>
        {text}
      </div>
    </div>
    </div>
  );
};

export default UiWhiteButtonLong;
