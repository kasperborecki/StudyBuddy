import {useEffect, useState} from 'react';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import OffersData from '../../services/common/Offer.Service';
import {Offer} from '../../interfaces/Offers.Interface';
import {useRecoilState} from 'recoil';
import {subjectIdAtom, subjectNameAtom} from '../../atoms/Subject.Atom';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {FaHeart, FaRegMoneyBillAlt, FaStar} from 'react-icons/fa';
import OfferSubHeader from '../uiComponents/uiHeaders/OfferSubHeader';
import {
  educationLevel,
  educationMethod,
  educationType,
  price,
} from '../../atoms/FIlter.Atom';
import {LuGraduationCap} from 'react-icons/lu';
import {RiHome3Line} from 'react-icons/ri';
import {IoArrowBack, IoGlobeOutline} from 'react-icons/io5';
import {HiBadgeCheck} from 'react-icons/hi';
import {offerId} from '../../atoms/SelectedOfferId.Atom';
import {useNavigate} from 'react-router-dom';
import trophyGold from '../../assets/nagrody/trophyGold.png'

const OfferCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedSubject] = useRecoilState(subjectIdAtom);
  const [selectedSubjectName] = useRecoilState(subjectNameAtom);
  const [offerData, setOfferData] = useState<Offer[]>([]);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [isEducationLevel] = useRecoilState(educationLevel);
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

  const handleBackButton = () => {
    navigate('/');
  };

  return (
    <>
      {isLoading ? (
        <LoadingSuspense />
      ) : (
        <>
          <div className='w-full pl-8 pr-8 mb-4 font-Roboto flex justify-between items-center text-[#212427]'>
            <IoArrowBack
              className={`h-8 w-8 mt-6`}
              onClick={handleBackButton}
            />
            <div className='w-full flex justify-center -ml-6'>
              <p className={` text-[22px] font-semibold mt-6 ${
                  isDarkMode
                    ? 'text-[#ffffff] text-opacity-80'
                    : 'text-[#414344]'
                }`}>
                {selectedSubjectName}
              </p>
            </div>
          </div>
          <OfferSubHeader />
          {offerData.map((offer) => (
            <div
              key={offer.offer_id}
              className={` relative w-[90%] h-32 rounded-3xl pl-4 mb-8 text-white shadow-md shadow-bottom shadow-gray-300  ${
                isDarkMode ? 'bg-[#363636]' : 'bg-[#ffffff94]'
              }`}
              onClick={() => handleOpenOffer(offer.offer_id)}>
              <div
                className='absolute h-24 left-0 mt-4
              '>
                <img
                  src={CDNURL + offer.profile?.avatar_url}
                  alt={'essa'}
                  className='w-20 h-20 rounded-l-3xl rounded-r-3xl mx-4 mt-2'
                />
                {offer.profile?.verificated ? (
                  <HiBadgeCheck className='absolute text-blue-500 top-1.5 left-52 w-5 h-5' />
                ) : (
                  <></>
                )}
              </div>
              <div>
                <div
                  className={`absolute left-28 font-jua font-bold text-[14px] flex py-2 ${
                    isDarkMode
                      ? 'text-[#ffffff] text-opacity-80'
                      : 'text-[#414344]'
                  }`}>
                  <div className='flex flex-row'>
                    <p className='mr-1'>{offer.profile?.name}</p>
                    <p>{offer.profile?.surname?.slice(0, 1)}.</p>
                    <div className='font-k2d font-bold text-[12px] flex flex-row  pt-[2px] ml-2'>
                      <div className='text-[#f7cd64] flex pt-[1px]'>
                        <FaStar />
                      </div>
                      <p
                        className={` pl-1 -mt-[1px] text-[13px] ${
                          isDarkMode
                            ? 'text-[#ffffff] text-opacity-80'
                            : 'text-[#414344]'
                        }`}>
                        4.0
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`absolute top-2 right-4 ${
                  isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-400'
                }`}>
                <FaHeart className='h-6 w-6' />
              </div>
              <div>
                <div className={`absolute mt-8 left-28 text-[12px] ${
                  isDarkMode
                    ? 'text-[#ffffff] text-opacity-80'
                    : 'text-[#414344]'
                }`}>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <LuGraduationCap className='text-[17px]' />
                    </div>
                    <p className='opacity-60'>
                      Doświadczenie {offer.profile?.experience_years} Lat
                    </p>
                  </div>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <IoGlobeOutline className='text-[17px]' />
                    </div>
                    <p className='opacity-60'>Języki: Polski, Angielski</p>
                  </div>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <RiHome3Line className='text-[17px]' />
                    </div>
                    <p className='opacity-60'>
                      Forma Nauki: {offer.education_method}
                    </p>
                  </div>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <FaRegMoneyBillAlt className='text-[17px]' />
                    </div>
                    <p className='opacity-60'>
                    Cena: {offer.price} ZŁ
                    </p>
                  </div>
                </div>
              </div>
              {/* <div
                className={` absolute left-28 top-24 font-k2d font-bold text-[12px] ${
                  isDarkMode ? 'text-white' : 'text-[#646668]'
                }`}>
                Cena: {offer.price} ZŁ
                <FaRegMoneyBillAlt />
              </div> */}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default OfferCard;
