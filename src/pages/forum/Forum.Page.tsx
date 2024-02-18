import { useRecoilState } from "recoil";
import { DarkModeAtom } from "../../atoms/DarkMode.Atom";
import { FaSearch } from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import { subjectNameAtom } from "../../atoms/Subject.Atom";

const ForumPage = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [selectedSubjectName] = useRecoilState(subjectNameAtom);

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-start ${
        isDarkMode ? "bg-[#212121]" : "bg-[#FEECEB]"
      }`}
    >
      <div>
        <div className="absolute left-0 bg-[#FEECEB] w-[50%] h-20 p-[25px]">
          <p className="font-semibold text-[22px] text-[#212427] ">Forum</p>
        </div>
        <div className="p-7 absolute flex flex-row justify-end right-0 bg-[#FEECEB] w-[50%] h-20">
          <FaSearch className="w-6 h-6 mx-2 text-gray-500" />
          <BsFilterRight className="w-7 h-7 -mt-0.5" />
        </div>
      </div>
      <div className="absolute flex justify-center h-20 w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600 to-gray-800 bg-gradient-to-rs top-20">
        <p className="text-white text-[22px] text-semibold p-5">
          {selectedSubjectName}
        </p>
      </div>
      <div className="relative top-40 bg-[#FEECEB] w-full">
        <div className=" w-[90%] m-[5%] h-96 bg-white ">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default ForumPage;
