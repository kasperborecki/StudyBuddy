import { useRecoilState } from "recoil";
import { addOfferPageAtom } from "../atoms/AddOfferPage.Atom";
import { DarkModeAtom } from "../atoms/DarkMode.Atom";

const BreadCrumb = () => {
  const [page, ] = useRecoilState(addOfferPageAtom);
  const [isDarkMode] = useRecoilState(DarkModeAtom);

  return (
    <div>
    <div className="flex justify-end -mt-10 mr-3">
    <p className={`font-k2d font-bold text-xl mt-2 mr-2 ${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Krok: </p>
    <p className="font-k2d font-bold text-xl mr-2 text-[#D687F3] ">{page}</p>
    <p className={`font-k2d font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-400'}`}>z 9</p>
  </div>
  <div className="flex mb-4">
  <div className={`w-[12%] h-1 ${page >= 1 ? 'bg-[#D687F3]' : 'bg-gray-300' }`} />
  <div className={`w-[12%] h-1 ${page >= 2 ? 'bg-[#D687F3]' : 'bg-gray-300' }`} />
  <div className={`w-[12%] h-1 ${page >= 3 ? 'bg-[#D687F3]' : 'bg-gray-300' }`} />
  <div className={`w-[12%] h-1 ${page >= 4 ? 'bg-[#D687F3]' : 'bg-gray-300' }`} />
  <div className={`w-[12%] h-1 ${page >= 5 ? 'bg-[#D687F3]' : 'bg-gray-300' }`} />
  <div className={`w-[12%] h-1 ${page >= 6 ? 'bg-[#D687F3]' : 'bg-gray-300' }`} />
  <div className={`w-[12%] h-1 ${page >= 7 ? 'bg-[#D687F3]' : 'bg-gray-300' }`} />
  <div className={`w-[12%] h-1 ${page >= 8 ? 'bg-[#D687F3]' : 'bg-gray-300' }`} />
  </div>
  </div>
  );
};

export default BreadCrumb;
