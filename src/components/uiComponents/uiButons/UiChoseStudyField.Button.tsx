import {useRecoilState} from 'recoil';
import {studyFieldAtom} from '../../../atoms/StudyField.Atom';

const UiChoseStudyField = () => {
  const [studyField, setStudyfield] = useRecoilState(studyFieldAtom);

  const handleSetLanguages = () => {
    setStudyfield(2);
  };

  const handleSetSubjects = () => {
    setStudyfield(1);
  };

  return (
    <div className='flex justify-center mb-8 mx-auto'>
       <button
        className={`relative text-[#212427] h-14 w-40 p-2 pb-2 flex justify-center items-center font-extrabold border-b-2 border-gray-400
        ${studyField === 1 ? 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#bb91ff] via-[#bb91ff10] to-[#553c9a00]' : ''}`}
        onClick={handleSetSubjects}>
       Przedmioty
      </button>
      <button
        className={`relative text-[#212427] h-14 w-40 p-2 pb-2 flex justify-center items-center font-extrabold border-b-2 border-gray-400
        ${studyField === 2 ? 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#bb91ff] via-[#bb91ff10] to-[#553c9a00]' : ''}`}
        onClick={handleSetLanguages}>
       Języki
      </button>
    </div>
  );
};

export default UiChoseStudyField;