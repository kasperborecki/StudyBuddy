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
        className={`relative duration-500 group cursor-pointer text-sky-50 overflow-hidden h-10 w-40 rounded-l-xl p-2 flex justify-center items-center font-extrabold ${
          studyField === 1 ? 'z-10' : 'z-0'
        }`}
        onClick={handleSetSubjects}>
        <div
          className={`absolute z-10 w-48 h-48 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 1 ? 'bg-[#60be38]' : 'bg-gray-800'
          } delay-150 group-hover:delay-75`}></div>
        <div
          className={`absolute z-10 w-40 h-40 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 1 ? 'bg-[#58Af33]' : 'bg-gray-700'
          } delay-150 group-hover:delay-100`}></div>
        <div
          className={`absolute z-10 w-32 h-32 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 1 ? 'bg-[#62c239]' : 'bg-gray-600'
          } delay-150 group-hover:delay-150`}></div>
        <div
          className={`absolute z-10 w-24 h-24 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 1 ? 'bg-[#a1cc33]' : 'bg-gray-500'
          } delay-150 group-hover:delay-200`}></div>
        <div
          className={`absolute z-10 w-16 h-16 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 1 ? 'bg-[#A5D825]' : 'bg-gray-400'
          } delay-150 group-hover:delay-300`}></div>
        <p className='z-10'>Subjects</p>
      </button>
      <button
        className={`relative duration-500 group cursor-pointer text-sky-50 -ml-2 overflow-hidden h-10 w-40 rounded-r-xl p-2 flex justify-center items-center font-extrabold
        ${studyField === 2 ? 'z-10' : 'z-0'}`}
        onClick={handleSetLanguages}>
        <div
          className={`absolute z-10 w-48 h-48 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 2 ? 'bg-[#60be38]' : 'bg-gray-800'
          } delay-150 group-hover:delay-75`}></div>
        <div
          className={`absolute z-10 w-40 h-40 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 2 ? 'bg-[#58Af33]' : 'bg-gray-700'
          } delay-150 group-hover:delay-100`}></div>
        <div
          className={`absolute z-10 w-32 h-32 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 2 ? 'bg-[#62c239]' : 'bg-gray-600'
          } delay-150 group-hover:delay-150`}></div>
        <div
          className={`absolute z-10 w-24 h-24 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 2 ? 'bg-[#a1cc33]' : 'bg-gray-500'
          } delay-150 group-hover:delay-200`}></div>
        <div
          className={`absolute z-10 w-16 h-16 rounded-full group-hover:scale-110 transition-all  duration-500 ease-in-out ${
            studyField === 2 ? 'bg-[#A5D825]' : 'bg-gray-400'
          } delay-150 group-hover:delay-300`}></div>
        <p className='z-10'>Languages</p>
      </button>
    </div>
  );
};

export default UiChoseStudyField;