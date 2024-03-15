import {useEffect, useState, useCallback} from 'react';
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md';
import OffersData from '../../services/common/Offer.Service';
import {useRecoilState} from 'recoil';
import {offerId} from '../../atoms/SelectedOfferId.Atom';
import {
  requestHourLessonAtom,
  requestModalLessonAtom,
  requestWeekDayLessonAtom,
} from '../../atoms/RequestLesson.Atom';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import {Availability, Requests} from '../../interfaces/Offers.Interface';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';

const AvailabilityCalendar = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [firstDayValue, setFirstDayValue] = useState<number>(0);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOfferId] = useRecoilState(offerId);
  const [availabilityData, setAvailabilityData] = useState<Availability[]>([]);
  const [requestedData, setRequestedData] = useState<Requests[]>([]);
  const [, setIsModalOpen] = useRecoilState(requestModalLessonAtom);
  const [, setRequestHour] = useRecoilState(requestHourLessonAtom);
  const [, setRequestWeekDay] = useRecoilState(requestWeekDayLessonAtom);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<string>('');

  const hourStyle =
    'text-center border-b font-semibold pb-2 pt-2 border-gray-400';

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
  }, [fetchDates]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setIsLoading(true);
        const subjectsRes = await OffersData.getAvailability(selectedOfferId);
        setAvailabilityData(subjectsRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const requestRes = await OffersData.getRequests(selectedOfferId);
        setRequestedData(requestRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
    fetchRequests();
  }, [selectedOfferId]);

  const handlePrevWeek = () => {
    if (firstDayValue >= 7) {
      setFirstDayValue((prevFirstDayValue) => prevFirstDayValue - 7);
    }
  };

  const handleNextWeek = () => {
    setFirstDayValue((prevFirstDayValue) => prevFirstDayValue + 7);
  };

  const handleOpenModal = ({
    weekDay,
    hour,
  }: {
    weekDay: string;
    hour: string;
  }) => {
    setIsModalOpen(true);
    setRequestHour(hour);
    setRequestWeekDay(weekDay);
  };



  return (
    <div className='w-full max-w-2xl mx-auto font-Roboto'>
      <div className={`flex w-full h-12  items-center justify-between rounded-t-xl mt-4 px-5 ${
        isDarkMode
          ? 'text-[#ffffff] text-opacity-90'
          : 'text-[#414344]'
      }`}>
        <button
          onClick={handlePrevWeek}
          disabled={isDisabled}
          className='w-8 h-8 border-2 border-[#c0c0c0] text-2xl pl-1.5 rounded-lg focus:outline-none focus:border-blue-500'>
          <MdArrowBackIos />
        </button>
        <div className='flex-1 text-center text-lg font-bold'>
          {displayText}
        </div>
        <button
          onClick={handleNextWeek}
          className='w-8 h-8 border-2 border-[#c0c0c0] text-2xl pl-1 rounded-lg focus:outline-none focus:border-blue-500'>
          <MdArrowForwardIos />
        </button>
      </div>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div className='flex px-4'>
          {weekDays.map((weekDay, index) => (
            <div
              key={index}
              className={`flex-1  ${
                index === 0 ? '-ml-0' : 'mx-1'
              }
            ${index === 6 ? '-mr-0' : 'mx-1'}
          `}>
              <div
                className={`text-center h-14 pt-2 px-[5px] font-semibold text-k2d border-b-4 mb-3 ${
                  isToday(weekDay)
                    ? 'border-b-4 border-b-green-400'
                    : 'border-b-4 border-b-[#D687F3]'
                }`}>
                {weekDay}
              </div>

              <div>
                {availabilityData.map((data) => (
                  <div key={data.id}>
                    {data.day.toLowerCase() ===
                      weekDay.slice(0, 2).toLowerCase() && (
                      <>
                        {requestedData.length >= 0 && (
                          <>
                            {requestedData.length !== 0 ? (
                              <>
                                {data.eight && requestedData.filter((req) => req.hour === '8:00' && req.week_day === weekDay).length === 0  && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '8:00', } )}>8:00</p>
                                )}
                                 {data.nine && requestedData.filter((req) => req.hour === '9:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '9:00', })}>9:00</p>
                                   )}
                                 {data.ten && requestedData.filter((req) => req.hour === '10:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '10:00', })}>10:00</p>
                                   )}
                                 {data.eleven && requestedData.filter((req) => req.hour === '11:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '11:00', })}>11:00</p>
                                   )}
                                 {data.twelve && requestedData.filter((req) => req.hour === '12:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '12:00', })}>12:00</p>
                                   )}
                                 {data.thirteen && requestedData.filter((req) => req.hour === '13:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '13:00', })}>13:00</p>
                                   )}
                                 {data.fourteen && requestedData.filter((req) => req.hour === '14:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '14:00', })}>14:00</p>
                                   )}
                                 {data.fifteen && requestedData.filter((req) => req.hour === '15:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '15:00', })}>15:00</p>
                                   )}
                                 {data.sixteen && requestedData.filter((req) => req.hour === '16:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '16:00', })}>16:00</p>
                                   )}
                                 {data.seventeen && requestedData.filter((req) => req.hour === '17:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '17:00', })}>17:00</p>
                                   )}
                                 {data.eighteen && requestedData.filter((req) => req.hour === '18:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '18:00', })}>18:00</p>
                                   )}
                                 {data.nineteen && requestedData.filter((req) => req.hour === '19:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '19:00', })}>19:00</p>
                                   )}
                                 {data.twenty && requestedData.filter((req) => req.hour === '20:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '20:00', })}>20:00</p>
                                   )}
                                 {data.twentyOne && requestedData.filter((req) => req.hour === '21:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '21:00', })}>21:00</p>
                                   )}
                                 {data.twentyTwo && requestedData.filter((req) => req.hour === '22:00' && req.week_day === weekDay).length === 0 && (
                                     <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '2:00', })}>22:00</p>
                                   )}
                                </>
                                ) : (
                                <>
                                 {data.eight && (
                                   <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '8:00', })}>8:00</p>
                                 )}
                                 {data.nine && (
                                   <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '9:00', })}>9:00</p>
                                 )}
                                 {data.ten && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '10:00', })}>10:00</p>
                                 )}
                                 {data.eleven && (
                                   <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '11:00', })}>11:00</p>
                                 )}
                                 {data.twelve && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '12:00', })}>12:00</p>
                                 )}
                                 {data.thirteen && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '13:00', })}>13:00</p>
                                 )}
                                 {data.fourteen && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '14:00', })}>14:00</p>
                                 )}
                                 {data.fifteen && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '15:00', })}>15:00</p>
                                 )}
                                 {data.sixteen && (
                                   <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '16:00', })}>16:00</p>
                                 )}
                                 {data.seventeen && (
                                   <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '17:00', })}>17:00</p>
                                 )}
                                 {data.eighteen && (
                                   <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '18:00', })}>18:00</p>
                                 )}
                                 {data.nineteen && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '19:00', })}>19:00</p>
                                 )}
                                 {data.twenty && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '20:00', })}>20:00</p>
                                 )}
                                 {data.twentyOne && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '21:00', })}>21:00</p>
                                 )}
                                 {data.twentyTwo && (
                                  <p className={hourStyle} onClick={() => handleOpenModal({ weekDay, hour: '22:00', })}>22:00</p>
                                 )}
                                </>
                              )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
