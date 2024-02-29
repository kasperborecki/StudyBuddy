import React, {useCallback, useEffect, useState} from 'react';
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md';
import {useRecoilState} from 'recoil';
import {AvabilityHours} from '../../constans/Avability.Constans';
import {ScheduleInterface} from '../../interfaces/Schedule.Interface';
import ScheduleData from '../../services/common/Schedule.Service';
import {useAuth} from '../../atoms/Route.Atom';

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
    setCurrentMonth((prevMonth) => prevMonth - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth + 1);
  };

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
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='bg-[#F4F5FA] pb-32'>
      <div className='w-full h-20 flex justify-center '>
        <p className='text-[22px] font-semibold mt-6'>Kalendarz</p>
      </div>
      <div className='flex items-center justify-between px-2 rounded-t-xl mt-4 mb-6 space-x-5 mx-[20%]'>
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
      <table className='border-x-2 border-[#9c9c9c] w-full bg-[#F4F5FA]'>
        {AvabilityHours.map((availability) => (
          <tr className='h-20'>
            <th className='w-28 border-y-2 border-r-2 border-[#9c9c9c] border-opacity-20'>
              {availability.name}
            </th>
            <th className='border-y-2 border-r-2 border-[#9c9c9c] border-opacity-20 px-4'>
              {scheduleData.filter(
                (schedule) => schedule.hour === availability.name,
              ).length === 1 ? (
                <div
                  className={`h-16 w-full bg-${availability.color} rounded-3xl text-gray-100 text-[17px]`}>
                  essa
                </div>
              ) : null}
            </th>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Schedule;
