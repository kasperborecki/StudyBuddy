import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import BreadCrumb from '../BreadCrumb';
import {
  addOfferAvability,
  addOfferCiteis,
  addOfferCiteisId,
  addOfferDescription,
  addOfferLevel,
  addOfferMethod,
  addOfferPrice,
  addOfferSubject,
  addOfferSubjectId,
  addOfferTime,
} from '../../atoms/AddOffer.Atom';
import {useAuth} from '../../atoms/Route.Atom';
import {useEffect, useState} from 'react';
import UserData from '../../services/User/UserData';
import {User} from '../../interfaces/User.Interface';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import {MdOutlinePlayLesson} from 'react-icons/md';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegClock} from 'react-icons/fa';
import {LuGraduationCap} from 'react-icons/lu';
import {AvabilityDays, AvabilityHours} from '../../constans/Avability.Constans';
import {addOfferPageAtom} from '../../atoms/AddOfferPage.Atom';
import OffersData from '../../services/common/Offer.Service';

const AddOfferTenthStep = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);

  const {session} = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [userData, setUserData] = useState<User[]>([]);


  const [subject] = useRecoilState(addOfferSubject);
  const [subjectId] = useRecoilState(addOfferSubjectId);
  const [time] = useRecoilState(addOfferTime);
  const [price] = useRecoilState(addOfferPrice);
  const [city] = useRecoilState(addOfferCiteis);
  const [cityId] = useRecoilState(addOfferCiteisId);
  const [level] = useRecoilState(addOfferLevel);
  const [method] = useRecoilState(addOfferMethod);
  const [description] = useRecoilState(addOfferDescription);
  const [avability] = useRecoilState(addOfferAvability);
  const [page, setPage] = useRecoilState(addOfferPageAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user.id) {
        try {
          setIsLoading(true);
          const userId = session.user.id;
          const subjectsRes = await UserData.getUserData(userId);
          setUserData(subjectsRes);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [session]);

  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  const handleBack = () => {
    setPage(page - 1);
  };

  const handleAddOffer = async () => {
    setIsLoading(true);
    if (session?.user.id) {
      const userId = session.user.id;
      await OffersData.addNewOffer(
        userId,
        subjectId,
        time,
        price,
        cityId,
        level,
        method,
        description,
        avability,
      );
    }
    setIsLoading(false);
  };

  return (
    <div className='w-[80%] mx-auto relative'>
      <BreadCrumb />
      <p
        className={`flex text-xl font-jua font-semibold text-black ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        Podgląd <p className='text-[#D687F3] px-2'>Oferty</p>
      </p>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div className='relative mt-8'>
          {userData.map((user) => (
            <div key={user.user_id}>
              <img
                src={CDNURL + user.avatar_url}
                alt={'profileAvatar'}
                className='absolute w-24 h-24 rounded-lg'
              />
              <p className='text-lg ml-32 font-k2d font-bold'>
                {user.nickName}
              </p>
            </div>
          ))}
          <div>
            <div className='mt-24'>
              <div className='flex text-md font-k2d font-medium pb-1'>
                <div className='pr-2 text-xl'>
                  <MdOutlinePlayLesson />
                </div>
                <p>Nauczany Przedmiot: {subject}</p>
              </div>
              {userData.map((user, index) => (
                <div
                  key={index}
                  className='flex text-md font-k2d font-medium pb-1'>
                  <div className='pr-2 text-xl'>
                    <LuGraduationCap />
                  </div>
                  <p>Doświadczenie {user.experience_years} Lat</p>
                </div>
              ))}
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
                  Cena: {price} ZŁ / {time}min
                </p>
              </div>
            </div>
          </div>
          <hr className='w-full h-[1px] bg-black opacity-20' />
          <div className='text-[16px]'>{description}</div>
          <hr className='w-full h-[1px] bg-black opacity-20' />
          <div>
            <p className='flex font-semibold text-md'>
              Poziom Nauczania: <p className='font-normal pl-2'>{level}</p>
            </p>
            <p className='flex font-semibold text-md'>
              Lokalizacja: <p className='font-normal pl-2'>{city}</p>
            </p>
            <p className='flex font-semibold text-md'>
              Forma Nauki: <p className='font-normal pl-2'>{method}</p>
            </p>
          </div>
          <div>
            <div className='max-h-[450px] overflow-y-auto relative mb-14 mt-10 scrollbar scrollbar-thumb-[#d687f33d]'>
              <table className='border-collapse w-full table-auto'>
                <thead className='sticky top-[-2px] bg-[#e0e0e0] '>
                  <tr>
                    {AvabilityDays.map((day) => (
                      <th
                        key={day.id}
                        className={`py-4 px-5 ${
                          day.id === 1 ? 'rounded-tl-2xl' : ''
                        } ${day.id === 7 ? 'rounded-tr-2xl' : ''}`}>
                        {day.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AvabilityHours.map((hour) => (
                    <tr key={hour.id}>
                      {AvabilityDays.map((day) => (
                        <td
                          key={`${day.id}-${hour.id}`}
                          className={` ${
                            avability[day.id - 1][hour.id]
                              ? 'bg-[#D687F3] border-2 rounded-2xl border-[#d687f300]'
                              : ''
                          } `}>
                          <div className='border-2 py-3 px-5 text-center font-bold rounded-2xl'>
                            {hour.name}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className='pb-32 flex'>
        <button
          className={`border-2 w-[45%] h-[40px] rounded-3xl mb-[8%] mx-auto my-auto flex items-center ${
            isDarkMode
              ? 'bg-[#2B2B2B] border-[#1a1a1a]'
              : 'bg-[#FFFFFF] border-[#dadada]'
          }`}
          onClick={handleBack}>
          <div
            className={` w-full h-full text-center text-k2b font-bold text-[18px] py-[5px] ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
            Wróć
          </div>
        </button>
        <button
          className='border-2 w-[45%] h-[40px] rounded-3xl mb-[8%] mx-auto my-auto flex items-center border-[#00000065] bg-gradient-to-l from-[#ffdd94] to-[#d687f3]'
          onClick={handleAddOffer}>
          <div
            className={` w-full h-full text-center text-k2b font-bold text-[18px] py-[5px] ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
            Dodaj
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddOfferTenthStep;
