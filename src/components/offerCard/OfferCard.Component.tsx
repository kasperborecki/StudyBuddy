import { useEffect, useState } from "react";
import LoadingSuspense from "../loadingSuspense/LoadingSuspense";
import OffersData from "../../services/common/Offer.Selector";
import { Offer } from "../../interfaces/Offers";
import { useRecoilState } from "recoil";
import { subjectIdAtom, subjectNameAtom } from "../../atoms/Subject.Atom";
import AccoundHeader from "../uiComponents/uiHeaders/AccountHeader";
import { DarkModeAtom } from "../../atoms/DarkMode.Atom";
import { FaRegStar, FaStar } from "react-icons/fa";


const OfferCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSubject,] = useRecoilState(subjectIdAtom);
  const [selectedSubjectName, ] = useRecoilState(subjectNameAtom);
  const [offerData, setOfferData] = useState<Offer[]>([]);
  const [, setImages] = useState<any[]>([]);
  const [isDarkMode, ] = useRecoilState(DarkModeAtom);


  const CDNURL = 'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const offerRes = await OffersData.getSelectedSubjectOffers(selectedSubject);
        setOfferData(offerRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [selectedSubject]);

  return (
    <>
      {isLoading ? (
        <LoadingSuspense />
      ) : (
        <>
          <AccoundHeader text={selectedSubjectName} />
          {offerData.map((offer) => (
            <div key={offer.offer_id} className={` relative w-[80%] h-28 rounded-3xl border-2 border-black pl-4 mb-8 text-white ${isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'}`}>
              <div className="absolute h-32 py-6">
                <img
                  src={CDNURL + offer.profile?.avatar_url}
                  alt={'essa'}
                  className='w-16 h-16 rounded-full'
                />
              </div>
              <div>
                <div className={`absolute ml-16 font-k2d font-bold text-[14px] flex py-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  <div className="mr-2">
                  {offer.profile?.name} 
                  </div>
                  <>
                  {offer.profile?.surname}
                  </>
                </div>
                <div className='absolute right-4 font-k2d font-bold text-[14px] flex py-4'>
                <div className="text-[#edb72d] flex">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
                </div>
                <p className={` pl-2 ${isDarkMode ? 'text-white' : 'text-[#D67BFF]'}`}>
                  / 4.0
                </p>
                </div>
              </div>
              <div></div>
              <div className={` absolute bottom-2 right-4 font-k2d font-bold text-[11px] ${isDarkMode ? 'text-white' : 'text-[#D67BFF]'}`}><p>cena: {offer.price}zł / 1h</p></div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default OfferCard;
