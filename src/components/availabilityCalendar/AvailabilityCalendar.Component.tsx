import {useEffect, useState, useCallback} from 'react';
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md';
import OffersData from '../../services/common/Offer.Service';
import {useRecoilState} from 'recoil';
import {offerId} from '../../atoms/SelectedOfferId.Atom';
import {Availability, Requests} from '../../interfaces/Offers.Interface';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';

const AvailabilityCalendar = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [firstDayValue, setFirstDayValue] = useState<number>(0);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOfferId] = useRecoilState(offerId);
  const [availabilityData, setAvailabilityData] = useState<Availability[]>([]);
  const [requestedData, setRequestedData] = useState<Requests[]>([]);
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
        // console.log(requestedData[0].week_day = weekDays);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
    fetchRequests();
  }, [selectedOfferId]);

  // console.log(requestedData[0].week_day);
  if (requestedData[0].week_day === weekDays[2]) {
    console.log('prawda');
  } else {
    console.log('nie prawda');
  }

  const handlePrevWeek = () => {
    if (firstDayValue >= 7) {
      setFirstDayValue((prevFirstDayValue) => prevFirstDayValue - 7);
    }
  };

  const handleNextWeek = () => {
    setFirstDayValue((prevFirstDayValue) => prevFirstDayValue + 7);
  };

  return (
    <div className='w-full max-w-2xl mx-auto mb-60 border-b-2 border-b-[#9c9c9c]'>
      <div className='flex w-full h-12 bg-gray-100 items-center justify-between px-2 rounded-t-xl border-t-2 border-x-2 border-[#9c9c9c] mt-4'>
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
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div className='flex'>
          {weekDays.map((weekDay, index) => (
            <div
              key={index}
              className={`flex-1  ${
                index === 0 ? 'border-l-2 border-[#9c9c9c] -ml-0' : 'mx-1'
              }
            ${index === 6 ? 'border-r-2 border-[#9c9c9c] -mr-0' : 'mx-1'}
          `}>
              <div
                className={`text-center h-14 pt-2 text-black px-2.5 font-semibold text-k2d border-b-4 mb-3 ${
                  isToday(weekDay)
                    ? 'border-b-4 border-b-green-400'
                    : 'border-b-4 border-b-[#D687F3]'
                }`}>
                {weekDay}
              </div>

              <div>
                {availabilityData.map((data) => (
                  <div key={data.id}>
                    {requestedData.map((request) => (
                      <div key={request.request_id}>
                        {data.day.toLowerCase() ===
                          weekDay.slice(0, 2).toLowerCase() && (
                          <>
                            {data.eight && request.hour !== '8:00' && (
                              <p className={hourStyle}>8:00</p>
                            )}
                            {data.nine && request.week_day !== weekDay && (
                              <p className={hourStyle}>9:00</p>
                            )}
                            {data.ten && request.week_day !== weekDay && (
                              <p className={hourStyle}>10:00</p>
                            )}
                            {data.eleven && request.week_day !== weekDay && (
                              <p className={hourStyle}>11:00</p>
                            )}
                            {data.twelve && request.week_day !== weekDay && (
                              <p className={hourStyle}>12:00</p>
                            )}
                            {data.thirteen && request.week_day !== weekDay && (
                              <p className={hourStyle}>13:00</p>
                            )}
                            {data.fourteen && request.week_day !== weekDay && (
                              <p className={hourStyle}>14:00</p>
                            )}
                            {data.fifteen && request.week_day !== weekDay && (
                              <p className={hourStyle}>15:00</p>
                            )}
                            {data.sixteen && request.week_day !== weekDay && (
                              <p className={hourStyle}>16:00</p>
                            )}
                            {data.seventeen && (
                              <>
                                {request.week_day === weekDay &&
                                request.hour !== '17:00' ? (
                                  <p className={hourStyle}>17:00</p>
                                ) : null}
                              </>
                            )}
                            {data.eighteen && (
                              <>
                                {request.week_day === weekDay &&
                                request.hour !== '18:00' ? (
                                  <p className={hourStyle}>18:00</p>
                                ) : null}
                              </>
                            )}
                            {data.nineteen && request.week_day !== weekDay && (
                              <p className={hourStyle}>19:00</p>
                            )}
                            {data.twenty && request.week_day !== weekDay && (
                              <p className={hourStyle}>20:00</p>
                            )}
                            {data.twentyOne && request.week_day !== weekDay && (
                              <p className={hourStyle}>21:00</p>
                            )}
                            {data.twentyTwo && request.week_day !== weekDay && (
                              <p className={hourStyle}>22:00</p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
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
