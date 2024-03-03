import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import {DarkModeAtom} from '../../../atoms/DarkMode.Atom';
import {subjectIdAtom, subjectNameAtom} from '../../../atoms/Subject.Atom';
import { IoPerson } from 'react-icons/io5';

interface CustomButtonProps {
  text?: any;
  colour?: string;
  icon?: any;
  subjectId?: any;
  CDNURL?: string;
  shadow?: string;
}

const UiWhiteButtonLong: React.FC<CustomButtonProps> = ({
  text,
  icon,
  subjectId,
  CDNURL,
  colour,
  shadow,
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
      className={`relative bg-opacity-20 w-40 m-3 h-44 rounded-3xl shadow-md shadow-bottom
      ${colour === 'bg-blue-400' && 'bg-blue-400 shadow-blue-500'}
      ${colour === 'bg-green-700' && 'bg-green-700 shadow-green-700'}
      ${colour === 'bg-orange-500' && 'bg-orange-500 shadow-orange-700'}
      ${colour === 'bg-green-900' && 'bg-green-900 shadow-green-700'}
      ${colour === 'bg-red-400' && 'bg-red-400 shadow-red-600'}
      ${colour === 'bg-purple-500' && 'bg-purple-500 shadow-purple-700'}
      ${colour === 'bg-amber-950' && 'bg-amber-950 shadow-amber-700'}
      ${colour === 'bg-gray-600 ' && 'bg-gray-600  shadow-gray-500'}
      ${colour === 'bg-blue-400' && 'bg-blue-400 shadow-blue-500'}
      `} 
      onClick={handleOfferPage}
    >
      <p>
        <b className='absolute top-2 left-2 text-[17px]'>{text}</b>
      </p>
      <div className='absolute flex flex-col top-8 left-2 font-semibold text-[13px]'>
        <p>~80PLN</p>
      </div>
      <div className='absolute flex flex-row bottom-3 left-3'>
        <IoPerson className='mr-[4px] mt-[2px]'/>
        <p><b>80</b> nauczycieli</p>
      </div>
      <img
        src={CDNURL + icon}
        alt='fizyka'
        className={`w-28 h-28 opacity-70 absolute right-0 top-8 ${text === 'Matematyka' ? 'mt-1' : ''}`}
      />
    </div>
  );
};


export default UiWhiteButtonLong;
