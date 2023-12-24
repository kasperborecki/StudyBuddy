import { useRecoilState } from "recoil";
import { addOfferPageAtom } from "../atoms/AddOfferPage.Atom";

const BreadCrumb = () => {
  const [page, ] = useRecoilState(addOfferPageAtom);

  return (
    <div className="flex justify-end mb-2 -mt-10">
    <p className="font-k2d font-bold text-xl mt-2 mr-2">Krok: </p>
    <p className="font-k2d font-bold text-xl mr-2 text-red-600 ">{page}</p>
    <p className="font-k2d font-bold text-xl ">z 8</p>
  </div>
  );
};

export default BreadCrumb;
