import {useCallback, useEffect, useState} from 'react';
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md';
import {useRecoilState} from 'recoil';
import {AvabilityHours} from '../../constans/Avability.Constans';
import {ScheduleInterface} from '../../interfaces/Schedule.Interface';
import ScheduleData from '../../services/common/Schedule.Service';
import {useAuth} from '../../atoms/Route.Atom';

const Schedule = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [firstDayValue, setFirstDayValue] = useState<number>(0);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chosenDay, setChosenDay] = useState<string>('pon. 1');
  const [scheduleData, setScheduleData] = useState<ScheduleInterface[]>([]);
  const {session} = useAuth();
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<string>('');

  const hourStyle =
    'text-center text-gray-700 border-b font-semibold pb-3 border-gray-400';

  const fetchDates = useCallback(() => {
    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + firstDayValue + i);

      const formattedDate = `${new Intl.DateTimeFormat('pl-PL', {
        weekday: 'short',
      }).format(currentDate)} ${currentDate.getDate()}`;

      daysOfWeek.push(formattedDate);
    }

    setWeekDays(daysOfWeek);
    setIsDisabled(firstDayValue < 0);

    const firstDayOfWeek = new Date();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + firstDayValue);
    setCurrentMonth(
      new Intl.DateTimeFormat('pl-PL', {month: 'long'}).format(firstDayOfWeek),
    );
    setCurrentYear(firstDayOfWeek.getFullYear());
  }, [firstDayValue]);

  const formattedCurrentMonth = currentMonth
    ? `${currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}`
    : '';
  const formattedWeekStart =
    weekDays.length > 0
      ? `${weekDays[0].charAt(0).toUpperCase() + weekDays[0].slice(1)}`
      : '';
  const formattedWeekEnd =
    weekDays.length > 0
      ? `${weekDays[6].charAt(0).toUpperCase() + weekDays[6].slice(1)}`
      : '';
  const displayText = `${formattedCurrentMonth} ${formattedWeekStart} - ${formattedWeekEnd} ${currentYear}`;

  const isToday = (date: string) => {
    const today = new Date();
    const formattedToday = `${new Intl.DateTimeFormat('pl-PL', {
      weekday: 'short',
    }).format(today)} ${today.getDate()}`;

    return date === formattedToday;
  };

  useEffect(() => {
    fetchDates();
    fetchScheduleData(chosenDay);
  }, [fetchDates]);

  useEffect(() => {
    const today = new Date();
    const formattedToday = `${new Intl.DateTimeFormat('pl-PL', {
      weekday: 'short',
    }).format(today)} ${today.getDate()}`;

    if (formattedToday.slice(0, 6) === 'niedz.') {
      today.setDate(today.getDate() + 1);
    } else {
      today.setDate(today.getDate());
    }

    const initialChosenDay = `${new Intl.DateTimeFormat('pl-PL', {
      weekday: 'short',
    }).format(today)} ${today.getDate()}`;

    setChosenDay(initialChosenDay);
  }, []);

  const handlePrevWeek = () => {
    if (firstDayValue >= 7) {
      setFirstDayValue((prevFirstDayValue) => prevFirstDayValue - 7);
    }
  };

  const handleNextWeek = () => {
    setFirstDayValue((prevFirstDayValue) => prevFirstDayValue + 7);
  };

  const fetchScheduleData = async (weekDay: string) => {
    if (session?.user.id) {
      console.log(weekDay);
      const userId = session.user.id;
      try {
        setIsLoading(true);
        const scheduleRes = await ScheduleData.getScheduleData(userId, weekDay); // Pass weekDay directly
        setScheduleData(scheduleRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  return (
    <div className='bg-[#FAEFFF] pb-32'>
      <div className='w-full h-20 flex justify-center '>
        <p className='text-[22px] font-semibold mt-6'>Kalendarz</p>
      </div>
      <div className='flex w-full h-12 bg-gray-100 items-center justify-between px-2 rounded-t-xl mt-4 shadow-md shadow-top'>
        <button
          onClick={handlePrevWeek}
          disabled={isDisabled}
          className='w-8 h-8 border-2 border-[#c0c0c0] text-2xl pl-1.5 rounded-lg focus:outline-none focus:border-blue-500'>
          <MdArrowBackIos />
        </button>
        <div className='flex-1 text-center text-lg font-bold text-gray-800'>
          {displayText}
        </div>
        <button
          onClick={handleNextWeek}
          className='w-8 h-8 border-2 border-[#c0c0c0] text-2xl pl-1 rounded-lg focus:outline-none focus:border-blue-500'>
          <MdArrowForwardIos />
        </button>
      </div>
      <div className='flex flex-row bg-gray-100'>
        {weekDays.map((weekDay, index) => (
          <div
            key={index}
            className={`flex-1 ${index === 0 ? '-ml-0' : 'mx-1'} ${
              index === 6 ? '-mr-0' : 'mx-1'
            }`}>
            <div
              className={`text-center w-11 h-14 pt-2 text-black px-2.5 font-semibold text-k2d mb-3 ${
                chosenDay === weekDay
                  ? 'w-full bg-[#644120] rounded-xl text-white'
                  : ''
              } ${
                weekDay.slice(0, 6) === 'niedz.'
                  ? `px-1 ${chosenDay === weekDay ? 'text-white' : ''}`
                  : ''
              }`}
              onClick={() => {
                setChosenDay(weekDay);
                fetchScheduleData(weekDay);
              }}>
              {weekDay}
            </div>
          </div>
        ))}
      </div>
      <table className='border-x-2 border-[#9c9c9c] w-full'>
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
