import {useRecoilState} from 'recoil';
import {offerId} from '../../atoms/SelectedOfferId.Atom';
import {useEffect, useState} from 'react';
import OffersData from '../../services/common/Offer.Service';
import {Offer} from '../../interfaces/Offers.Interface';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';
import {MdOutlinePlayLesson} from 'react-icons/md';
import {LuGraduationCap} from 'react-icons/lu';
import {FaRegClock, FaRegMoneyBillAlt} from 'react-icons/fa';
import AvailabilityCalendar from '../../components/availabilityCalendar/AvailabilityCalendar.Component';
import ContactModal from '../../components/modal/ContactModal.Component';
import {useNavigate} from 'react-router';
import {IoArrowBack} from 'react-icons/io5';
import {FaLocationDot} from 'react-icons/fa6';
import { GrSend } from "react-icons/gr";

const CDNURL =
  'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

const OfferDetailsPage = () => {
  const [selectedOfferId] = useRecoilState(offerId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offerData, setOfferData] = useState<Offer[]>([]);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/offers');
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const offerRes = await OffersData.getOffer(selectedOfferId);
        setOfferData(offerRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [selectedOfferId]);

  return (
    <div
      className='relative min-h-screen bg-[#FAEFFF] pb-1'
      style={{overflowY: 'auto'}}>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div className='relative'>
          {/* <IoArrowBack
            className={`absolute h-8 w-8 z-10 top-4 left-4 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            onClick={handleBackButton}
          /> */}
          {offerData.map((offer, index) => (
            // <div
            //   key={index}
            //   className='h-96 w-full bg-[#789461] relative'>
            //   <div className=''>
            //     <img
            //       src={CDNURL + offer.profile?.avatar_url}
            //       alt={'profileAvatar'}
            //       className='absolute top-16 left-6 w-24 h-24 rounded-full '
            //     />
            //     <div className='absolute left-30 top-16'>
            //     <p className='text-lg font-k2d font-bold'>
            //       {offer.profile?.name}
            //       {offer.profile?.surname}
            //     </p>
            //     </div>
            //   </div>
            //   <div>
            //     <div className='mt-24'>
            //       <div className='flex text-md font-k2d font-medium pb-1'>
            //         <div className='pr-2 text-xl'>
            //           <MdOutlinePlayLesson />
            //         </div>
            //         <p>Nauczany Przedmiot: {offer.subject_id}</p>
            //       </div>

            //       <div className='flex text-md font-k2d font-medium pb-1'>
            //         <div className='pr-2 text-xl'>
            //           <LuGraduationCap />
            //         </div>
            //         <p>Doświadczenie {offer.profile?.experience_years} Lat</p>
            //       </div>

            //       <div className='flex text-md font-k2d font-medium pb-1'>
            //         <div className='pr-2 text-xl'>
            //           <FaRegClock />
            //         </div>
            //         <p>69 przeprowadzonych Zajęć</p>
            //       </div>
            //       <div className='flex text-md font-k2d font-medium pb-1'>
            //         <div className='pr-2 text-xl'>
            //           <FaRegMoneyBillAlt />
            //         </div>
            //         <p>
            //           Cena: {offer.price} ZŁ / {offer.time} min
            //         </p>
            //       </div>
            //     </div>
            //   </div>
            //   <hr className='w-full h-[1px] bg-black opacity-20' />
            //   <div className='text-[16px]'>{offer.description}</div>
            //   <hr className='w-full h-[1px] bg-black opacity-20' />
            //   <div>
            //     <p className='flex font-semibold text-md'>
            //       Poziom Nauczania:{' '}
            //       <p className='font-normal pl-2'>{offer.education_level}</p>
            //     </p>
            //     <p className='flex font-semibold text-md'>
            //       Lokalizacja: <p className='font-normal pl-2'>{offer.city}</p>
            //     </p>
            //     <p className='flex font-semibold text-md'>
            //       Forma Nauki:{' '}
            //       <p className='font-normal pl-2'>{offer.education_method}</p>
            //     </p>
            //   </div>
            //   <ContactModal
            //     profilePic={offer.profile?.avatar_url}
            //     name={offer.profile?.name}
            //     surname={offer.profile?.surname}
            //   />
            //   <div className='h-24 w-full bg-[#50623A] rounded-t-3xl -mt-6'></div>
            // </div>
            <>
              <div
                key={index}
                className='relative h-96 w-full bg-[#4c9b54]'>
                <IoArrowBack
                  className={`absolute h-8 w-8 z-10 top-4 left-4 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                  onClick={handleBackButton}
                />
                <img
                  src={CDNURL + offer.profile?.avatar_url}
                  alt={'profileAvatar'}
                  className='absolute top-[75px] left-6 w-[95px] h-[95px] rounded-full'
                />
                <div className='absolute flex flex-col w-[60%] right-4 top-20'>
                  <div className='flex flex-row text-[18px] font-semibold text-white mb-2'>
                    <p className='mr-1'>{offer.profile?.name}</p>
                    <p>{offer.profile?.surname}</p>
                    <button className='h-[30px] w-28 text-[15px] cursor-pointer group relative flex flex-row gap-1.5 pl-10 py-1 ml-3 -mt-[2px] bg-white bg-opacity-90 text-[#4c9b54] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md '>
                    <GrSend className='text-[#4c9b54] absolute left-3 mt-[4px] h-4 w-4'/>
                      <p>Czatuj</p>
                    </button>
                  </div>
                  <p className='text-[15px] text-gray-200'>
                    {offer.description}
                  </p>
                </div>
                <div className='absolute flex flex-row top-48 left-5'>
                  <FaLocationDot className='text-white h-5 w-5' />
                  <p className='text-white ml-1 text-[15px] -mt-0.5'>{offer.profile?.city}</p>
                </div>
              </div>
              <div className='absolute h-28 w-full bg-[#3f8045] rounded-t-3xl -mt-6'></div>
              <div className='absolute h-[700px] w-full rounded-t-3xl bg-white mt-16 pt-10'>
                <p className='flex justify-center items-center text-[22px] font-semibold mt-6 text-[#212427]'>
                  Zarezerwuj lekcje
                </p>
                <AvailabilityCalendar />
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferDetailsPage;
