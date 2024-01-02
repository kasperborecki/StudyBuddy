import { useRecoilState } from 'recoil';
import { offerId } from '../../atoms/SelectedOfferId.Atom';
import { useEffect, useState } from 'react';
import OffersData from '../../services/common/Offer.Service';
import { Offer } from '../../interfaces/Offers.Interface';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';
import { MdOutlinePlayLesson } from 'react-icons/md';
import { LuGraduationCap } from 'react-icons/lu';
import { FaRegClock, FaRegMoneyBillAlt } from 'react-icons/fa';
import BottomBar from '../../components/bottomBar/BottomBar';
import AvailabilityCalendar from '../../components/availabilityCalendar/AvailabilityCalendar.Component';


const CDNURL =
  'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

const OfferDetailsPage = () => {
  const [selectedOfferId] = useRecoilState(offerId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offerData, setOfferData] = useState<Offer[]>([]);
  const [isDarkMode] = useRecoilState(DarkModeAtom);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const offerRes = await OffersData.getOffer(selectedOfferId);
        setOfferData(offerRes);
        console.log(offerRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [selectedOfferId]);

  return (
    <div className='relative min-h-screen mx-[8%]'>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div className='relative mt-8'>
          {offerData.map((offer, index) => (
            <div key={index}>
              <div>
                <img
                  src={CDNURL + offer.profile?.avatar_url}
                  alt={'profileAvatar'}
                  className='absolute w-24 h-24 rounded-lg'
                />
                <p className='text-lg ml-32 font-k2d font-bold'>
                  {offer.profile?.nickName}
                </p>
              </div>
              <div>
                <div className='mt-24'>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <MdOutlinePlayLesson />
                    </div>
                    <p>Nauczany Przedmiot: {offer.subject_id}</p>
                  </div>

                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <LuGraduationCap />
                    </div>
                    <p>Doświadczenie {offer.profile?.experience_years} Lat</p>
                  </div>

                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <FaRegClock />
                    </div>
                    <p>69 przeprowadzonych Zajęć</p>
                  </div>
                  <div className='flex text-md font-k2d font-medium pb-1'>
                    <div className='pr-2 text-xl'>
                      <FaRegMoneyBillAlt />
                    </div>
                    <p>
                      Cena: {offer.price} ZŁ / {offer.time} min
                    </p>
                  </div>
                </div>
              </div>
              <hr className='w-full h-[1px] bg-black opacity-20' />
              <div className='text-[16px]'>{offer.description}</div>
              <hr className='w-full h-[1px] bg-black opacity-20' />
              <div>
                <p className='flex font-semibold text-md'>
                  Poziom Nauczania: <p className='font-normal pl-2'>{offer.education_level}</p>
                </p>
                <p className='flex font-semibold text-md'>
                  Lokalizacja: <p className='font-normal pl-2'>{offer.city}</p>
                </p>
                <p className='flex font-semibold text-md'>
                  Forma Nauki: <p className='font-normal pl-2'>{offer.education_method}</p>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <AvailabilityCalendar />
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default OfferDetailsPage;
