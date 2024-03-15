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
    <div className='flex justify-center mb-8 mx-auto font-Roboto'>
       <button
        className={`relative h-14 w-40 p-2 pb-2 flex justify-center items-center font-roboto font-semibold border-b-[3px] rounded-full border-gray-400 mr-3
        ${studyField === 1 ? 'text-[#212427]' : 'text-gray-400'}`}
        onClick={handleSetSubjects}>
       Przedmioty
      </button>
      <button
        className={`relative h-14 w-40 p-2 pb-2 flex justify-center items-center font-roboto font-semibold border-b-[3px] rounded-full border-gray-400 ml-3
        ${studyField === 2 ? 'text-[#212427]' : 'text-gray-400'}`}
        onClick={handleSetLanguages}>
       Języki
      </button>
    </div>
  );
};

export default UiChoseStudyField;