import {useEffect, useState} from 'react';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import OffersData from '../../services/common/Offer.Service';
import {Offer} from '../../interfaces/Offers.Interface';
import {useRecoilState} from 'recoil';
import {subjectIdAtom, subjectNameAtom} from '../../atoms/Subject.Atom';
import AccoundHeader from '../uiComponents/uiHeaders/AccountHeader';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {FaRegStar, FaStar} from 'react-icons/fa';
import OfferSubHeader from '../uiComponents/uiHeaders/OfferSubHeader';
import {
  educationLevel,
  educationMethod,
  educationType,
  price,
} from '../../atoms/FIlter.Atom';
import {MdOutlinePlayLesson} from 'react-icons/md';
import {LuGraduationCap} from 'react-icons/lu';
import {RiHome3Line} from 'react-icons/ri';
import {IoGlobeOutline} from 'react-icons/io5';
import {MdOutlineMessage} from 'react-icons/md';
import {HiBadgeCheck} from 'react-icons/hi';
import {offerId} from '../../atoms/SelectedOfferId.Atom';
import {useNavigate} from 'react-router';

const OfferCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedSubject] = useRecoilState(subjectIdAtom);
  const [selectedSubjectName] = useRecoilState(subjectNameAtom);
  const [offerData, setOfferData] = useState<Offer[]>([]);
  // const [, setImages] = useState<any[]>([]);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isEducationLevel] = useRecoilState(educationLevel);
  const [isEducationType] = useRecoilState(educationType);
  const [isEducationMethod] = useRecoilState(educationMethod);
  const [isPrice] = useRecoilState(price);
  const [, setSelectedOfferId] = useRecoilState(offerId);

  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const offerRes = await OffersData.getSelectedSubjectOffers(
          selectedSubject,
          isEducationLevel,
          isEducationType,
          isEducationMethod,
          isPrice,
        );
        setOfferData(offerRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [selectedSubject]);

  const handleOpenOffer = (offerId: any) => {
    setSelectedOfferId(offerId);
    navigate(`/offerDetail/${offerId}`);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSuspense />
      ) : (
        <>
          <AccoundHeader text={selectedSubjectName} />
          <OfferSubHeader />
          {offerData.map((offer) => (
            <div
              key={offer.offer_id}
              className={` relative w-[80%] h-40 rounded-3xl border-2 border-black pl-4 mb-8 text-white ${
                isDarkMode ? 'bg-[#212121]' : 'bg-[#FFFFFF]'
              }`}
              onClick={() => handleOpenOffer(offer.offer_id)}>
              <div
                className='absolute h-32 pt-3
              '>
                <img
                  src={CDNURL + offer.profile?.avatar_url}
                  alt={'essa'}
                  className='w-16 h-16 rounded-full'
                />
                {offer.profile?.verificated ? (
                  <HiBadgeCheck className='absolute text-blue-500 top-1.5 left-52 w-5 h-5' />
                ) : (
                  <></>
                )}
              </div>
              <div>
                <div
                  className={`absolute ml-20 font-jua font-bold text-[14px] flex py-2 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>
                  <div className='mr-2 ml-1'>{offer.profile?.nickName}</div>
                </div>
                <div className='absolute left-4 -bottom-1 font-k2d font-bold text-[12px] flex py-2'>
                  <div className='text-[#edb72d] flex pt-[1px]'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                  </div>
                  <p
                    className={` pl-2 text-[13px] ${
                      isDarkMode ? 'text-white' : 'text-[#D67BFF]'
                    }`}>
                    / 4.0
                  </p>
                </div>
              </div>
              <div>
                <div className='mt-8 ml-20 text-black  text-[12px]'>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <LuGraduationCap className='text-[17px]' />
                    </div>
                    <p className='opacity-40'>
                      Doświadczenie {offer.profile?.experience_years} Lat
                    </p>
                  </div>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <IoGlobeOutline className='text-[17px]' />
                    </div>
                    <p className='opacity-40'>Języki: Polski, Angielski</p>
                  </div>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <MdOutlinePlayLesson className='text-[17px]' />
                    </div>
                    <p className='opacity-40'>69 Lekcji</p>
                  </div>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <RiHome3Line className='text-[17px]' />
                    </div>
                    <p className='opacity-40'>
                      Forma Nauki: {offer.education_method}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={` absolute bottom-2 right-4 font-k2d font-bold text-[12px] ${
                  isDarkMode ? 'text-white' : 'text-[#D67BFF]'
                }`}>
                Cena: {offer.price} ZŁ / {offer.time}min
              </div>
              <div className='absolute border-2 border-black text-black text-3xl w-16 h-12 pt-1.5 pl-3.5 p-auto rounded-2xl right-4 top-10 bg-gradient-to-l from-[#ffdd94] to-[#d687f3]'>
                <MdOutlineMessage />
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default OfferCard;
