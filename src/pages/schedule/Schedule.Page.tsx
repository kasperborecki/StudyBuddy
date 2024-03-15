import React, {useCallback, useEffect, useState} from 'react';
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md';
import {useRecoilState} from 'recoil';
import {AvabilityHours} from '../../constans/Avability.Constans';
import {ScheduleInterface} from '../../interfaces/Schedule.Interface';
import ScheduleData from '../../services/common/Schedule.Service';
import {useAuth} from '../../atoms/Route.Atom';
import {FaBell} from 'react-icons/fa';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';

const Schedule = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chosenDay, setChosenDay] = useState<string>('pon. 1');
  const [scheduleData, setScheduleData] = useState<ScheduleInterface[]>([]);
  const {session} = useAuth();

  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  const fetchDates = useCallback(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysOfWeek = [];

    for (let i = 1; i <= daysInMonth; i++) {
      if (
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear() &&
        i < currentDay
      ) {
        continue;
      }

      const iteratedDate = new Date(currentYear, currentMonth, i);

      const formattedDate = `${new Intl.DateTimeFormat('pl-PL', {
        weekday: 'short',
      }).format(iteratedDate)} ${iteratedDate.getDate()}`;

      daysOfWeek.push(formattedDate);
    }

    setWeekDays(daysOfWeek);

    const formattedCurrentDate = `${new Intl.DateTimeFormat('pl-PL', {
      weekday: 'short',
    }).format(currentDate)} ${currentDate.getDate()}`;

    setChosenDay(formattedCurrentDate);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    setFirstDayOfMonth(new Date(currentYear, currentMonth, 1));
  }, [currentYear, currentMonth]);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  const handlePrevMonth = () => {
    const monthNames = [
      'styczeń',
      'luty',
      'marzec',
      'kwiecień',
      'maj',
      'czerwiec',
      'lipiec',
      'sierpień',
      'wrzesień',
      'październik',
      'listopad',
      'grudzień',
    ];

    const date = new Date();
    const month = date.getMonth();

    const monthName = monthNames[month];

    if (currentMonth === monthNames.indexOf(monthName)) {
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
    if (formattedCurrentMonth === 'styczeń') {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth + 1);
    if (formattedCurrentMonth === 'grudzień') {
      setCurrentYear(currentYear + 1);
    }
  };

  console.log(currentMonth);

  const formattedCurrentMonth = new Intl.DateTimeFormat('pl-PL', {
    month: 'long',
  }).format(firstDayOfMonth);
  const displayText = `${formattedCurrentMonth} ${currentYear}`;

  const fetchScheduleData = async (weekDay: string) => {
    if (session?.user.id) {
      console.log(weekDay);
      const userId = session.user.id;
      try {
        setIsLoading(true);
        const scheduleRes = await ScheduleData.getScheduleData(userId, weekDay);
        setScheduleData(scheduleRes);
        console.log(scheduleData);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  console.log(ScheduleData);

  return (
    <div className='bg-[#F4F5FA] pb-32'>
      <div className='w-full h-20 flex justify-center '>
        <p className='text-[22px] font-semibold mt-6'>Kalendarz</p>
      </div>
      <div className='flex items-center justify-between px-2 rounded-t-xl mt-4 mb-6 space-x-5 mx-[16%]'>
        <button
          onClick={handlePrevMonth}
          className='w-8 h-8 border-2 border-[#c0c0c0] text-2xl pl-1.5 rounded-lg focus:outline-none focus:border-blue-500'>
          <MdArrowBackIos />
        </button>
        <div className='text-lg font-bold text-gray-800'>{displayText}</div>
        <button
          onClick={handleNextMonth}
          className='w-8 h-8 border-2 border-[#c0c0c0] text-2xl pl-1 rounded-lg focus:outline-none focus:border-blue-500'>
          <MdArrowForwardIos />
        </button>
      </div>

      <div className='overflow-x-auto'>
        <div className='flex flex-row bg-[#F4F5FA]'>
          {weekDays.map((weekDay, index) => (
            <div
              key={index}
              className={`flex-1 ${index === 0 ? '-ml-0' : 'mx-1'} ${
                index === 6 ? '-mr-0' : 'mx-1'
              }`}>
              <div
                className={`text-center w-12 h-14 pt-2 text-black px-2.5 font-semibold text-k2d mb-3 ${
                  chosenDay === weekDay
                    ? 'bg-[#FF6969] rounded-2xl text-white w-12'
                    : 'border-2 border-[#FF6969] rounded-xl'
                } ${
                  weekDay.slice(0, 6) === 'niedz.'
                    ? `px-[6px] ${chosenDay === weekDay ? 'text-white' : ''}`
                    : ''
                } ${
                  weekDay.slice(0, 3) === 'pt.' ||
                  ('wt.' && chosenDay === weekDay)
                    ? `px-[12px] ${chosenDay === weekDay ? 'text-white' : ''}`
                    : ''
                }
                `}
                onClick={() => {
                  setChosenDay(weekDay);
                  fetchScheduleData(weekDay);
                }}>
                {weekDay}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <table className='border-x-2 border-[#9c9c9c] w-full bg-[#F4F5FA] relative'>
          {AvabilityHours.map((availability) => (
            <tr className='h-20'>
              <th className='w-28 border-y-2 border-r-2 border-[#9c9c9c] border-opacity-20'>
                {availability.name}
                <div
                  className={`absolute ml-[102px] -mt-[19px] h-5 w-5 bg-white rounded-full border-[6px]
              ${availability.name === '8:00' && 'border-red-400'}
              ${availability.name === '9:00' && 'border-cyan-600'}
              ${availability.name === '10:00' && 'border-green-600'}
              ${availability.name === '11:00' && 'border-orange-400'}
              ${availability.name === '12:00' && 'border-cyan-500'}
              ${availability.name === '13:00' && 'border-emerald-600'}
              ${availability.name === '14:00' && 'border-amber-800'}
              ${availability.name === '15:00' && 'border-purple-600'}
              ${availability.name === '16:00' && 'border-green-800'}
              ${availability.name === '17:00' && 'border-green-500'}
              ${availability.name === '18:00' && 'border-purple-600'}
              ${availability.name === '19:00' && 'border-pink-700'}
              ${availability.name === '20:00' && 'border-rose-600'}
              ${availability.name === '21:00' && 'border-orange-400'}
              ${availability.name === '22:00' && 'border-pink-700'}
              `}
                />
              </th>
              <th className='border-y-2 border-r-2 border-[#9c9c9c] border-opacity-20 px-4'>
                {scheduleData
                  .filter((schedule) => schedule.hour === availability.name)
                  .map((schedule) => (
                    <div
                      className={`h-16 w-full bg-opacity-90 border-2 rounded-3xl text-gray-100 text-[17px] flex flex-row shadow-md shadow-bottom
                      ${availability.color === 'red-400' && 'bg-red-400 border-red-400 shadow-red-400'}
                      ${availability.color === 'cyan-600' && 'bg-cyan-600 border-cyan-600 shadow-yan-600'}
                      ${availability.color === 'green-600' && 'bg-green-600 border-green-600 shadow-green-600'}
                      ${availability.color === 'orange-400' && 'bg-orange-400 border-orange-400 shadow-orange-400'}
                      ${availability.color === 'cyan-500' && 'bg-cyan-500 border-cyan-500 shadow-cyan-500'}
                      ${availability.color === 'emerald-600' && 'bg-emerald-600 border-emerald-600 shadow-emerald-600'}
                      ${availability.color === 'amber-800' && 'bg-amber-800 border-amber-800 shadow-amber-800'}
                      ${availability.color === 'purple-600' && 'bg-purple-600 border-purple-600 shadow-purple-600'}
                      ${availability.color === 'green-800' && 'bg-green-800 border-green-800 shadow-green-800'}
                      ${availability.color === 'green-500' && 'bg-green-500 border-green-500 shadow-green-500'}
                      ${availability.color === 'purple-600' && 'bg-purple-600 border-purple-600 shadow-purple-600'}
                      ${availability.color === 'pink-700' && 'bg-pink-700 border-pink-700 shadow-pink-700'}
                      ${availability.color === 'rose-600' && 'bg-rose-600 border-rose-600 shadow-rose-600'}
                      ${availability.color === 'orange-400' && 'bg-orange-400 border-orange-400 shadow-range-400'}
                      ${availability.color === 'pink-700' && 'bg-pink-700 border-pink-700 shadow-ink-700'}
                      `}>
                      <div className='h-full w-[70%] p-2 text-sky-100'>
                        <p className='text-[12px] font-semibold'>
                          <b>{schedule.topic}</b>
                        </p>
                        <p className='text-[9px] font-semibold'>
                          {schedule.participantInfo?.name}{' '}
                          {schedule.participantInfo?.surname}
                        </p>
                      </div>
                      <div className='h-full w-[25%]'>
                        <img
                          src={CDNURL + schedule.participantInfo?.avatar_url}
                          alt='profileAvatar'
                          className='w-12 h-12 rounded-full ml-2 mt-2'
                        />
                      </div>
                    </div>
                  ))}
              </th>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default Schedule;
