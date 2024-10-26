import { useEffect, useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import dayjs from 'dayjs';
import '../styles/DateNav.scss';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';


import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const DateNav = (props) => {
  const {
    currentDate,
    setCurrentDate,
    handleDateChange,
    optionalButton,
    handleOptionalButton,
    disableDays,
  } = props;

  const [currentWeekDays, setCurrentWeekDays] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isPreviousWeekAvailable, setIsPreviousWeekAvailable] = useState(true);

  useEffect(() => {
    getCurrentWeekDays(currentDate);
    if (shouldDisableDate(dayjs(currentDate))) setCurrentDate(addDays(currentDate, 1));
  }, [currentDate]);

  useEffect(() => {
    checkPreviousWeekAvailability();
  }, [currentDate, currentWeekDays]);

  const getCurrentWeekDays = (currentDate) => {
    const weekDays = [];
    const dayOfWeek = currentDate.getDay(); // Get day of the week
    const startOfWeek = subDays(currentDate, dayOfWeek); // Get the Sunday of the current week

    for (let i = 0; i < 7; i++) {
      weekDays.push(addDays(startOfWeek, i));
    }

    setCurrentWeekDays(weekDays);
  };

  const navigateToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
    handleDateChange(dayjs(addDays(currentDate, 7)))
  };

  const navigateToPreviousWeek = () => {
    let dateToCheck = subDays(currentDate, 7);

    // Loop to find the next available non-disabled date
    while (true) {
      const previousWeekDays = Array.from({ length: 7 }, (_, i) => addDays(dateToCheck, i));

      // Find the first available day in the previous week
      const firstAvailableDay = previousWeekDays.find((day) => !shouldDisableDate(dayjs(day)));

      if (firstAvailableDay) {
        setCurrentDate(firstAvailableDay);
        handleDateChange(dayjs(firstAvailableDay))
        break;
      } else {
        // If no available day is found in this week, move to the previous week
        dateToCheck = subDays(dateToCheck, 7);
      }
    }
  };

  const handleOpenCalendar = () => setOpenCalendar(true);

  const handleCloseCalendar = () => setOpenCalendar(false);

  const shouldDisableDate = (day) => {
    const now = new Date();
    const currentDayOfWeek = now.getDay();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentDate = now.getDate();
    console.log(currentDate)
    // Disable all previous days
    if (day.isBefore(now, 'day')) {
      return true;
    }
    // Disable Sundays (0) and Mondays (1)
    if (day.day() === 0 || day.day() === 1) {
      return true;
    }
    // Disable Saturdays (6) if current time is past 15:30
    if (day.date() === currentDate && currentDayOfWeek === 6 && currentTime >= '15:30') {
      return true;
    }
    // Disable other days only if it's the same day and the current time is past 19:00
    if (day.date() === currentDate && currentTime >= '19:00') {
      return true;
    }

    return false;
  };

  const checkPreviousWeekAvailability = () => {
    const previousWeekStart = subDays(currentDate, 7);
    const previousWeekDays = Array.from({ length: 7 }, (_, i) =>
      addDays(previousWeekStart, i)
    );

    const hasAvailableDay = previousWeekDays.some(
      (day) => !shouldDisableDate(dayjs(day))
    );

    setIsPreviousWeekAvailable(hasAvailableDay);
  };

  return (
    <div id='date-nav'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section>
          {optionalButton &&
            <Button onClick={() => handleOptionalButton(optionalButton)}>{optionalButton}</Button>
          }
          <Button
            endIcon={<CalendarMonthIcon />}
            onClick={handleOpenCalendar}
          >
            {currentDate.toLocaleDateString('en-US', { month: 'long' })}
            {format(currentDate, ' yyyy')}
          </Button>
        </section>

        <DatePicker
          open={openCalendar}
          onClose={handleCloseCalendar}
          value={dayjs(currentDate)}
          onChange={handleDateChange}
          disablePast={disableDays}
          shouldDisableDate={disableDays && shouldDisableDate}
          slotProps={{
            textField: {
              sx: {
                opacity: 0,
                width: 0,
                height: 0,
                padding: 0,
              },
            },
          }}
        />
      </LocalizationProvider>

      <section id='date-scroll-bar'>
        <Button
          className='week-nav-btn'
          onClick={navigateToPreviousWeek}
          disabled={!isPreviousWeekAvailable}
        >
          Prev<br />Week
        </Button>
        {currentWeekDays.map((weekDate, index) => (
          <Button
            key={index}
            className={`${weekDate.getDay() === currentDate.getDay() ? 'currentDay' : 'otherDays'} `}
            onClick={() => handleDateChange(dayjs(weekDate))}
            disabled={disableDays && shouldDisableDate(dayjs(weekDate))}
          >
            <section>
              {weekDate.toLocaleDateString('en-US', { weekday: 'short' })[0]}
            </section>
            <section className={`${disableDays && shouldDisableDate(dayjs(weekDate)) ? 'disabled-button' : ''}`}>
              {weekDate.getDate()}
            </section>
          </Button>
        ))}

        <Button
          className='week-nav-btn'
          onClick={navigateToNextWeek}
        >
          Next<br /> Week
        </Button>
      </section>
    </div>
  );
};

export default DateNav;
