import { useEffect, useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import dayjs from 'dayjs';
import '../styles/DateNav.scss'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const DateNav = (props) => {
  const {
    currentDate,
    setCurrentDate,
    handleDateChange,
    optionalButton,
    handleOptionalButton
  } = props

  useEffect(() => {
    getCurrentWeekDays(currentDate)
  }, [currentDate])

  const [currentWeekDays, setCurrentWeekDays] = useState([])
  const [openCalendar, setOpenCalendar] = useState(false);

  const getCurrentWeekDays = (currentDate) => {
    const weekDays = [];

    // Find the number of days to subtract to get back to Sunday
    const dayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    const startOfWeek = subDays(currentDate, dayOfWeek); // Get the Sunday of the current week

    // Push each day from Sunday to Saturday into the weekDays array
    for (let i = 0; i < 7; i++) {
      weekDays.push(addDays(startOfWeek, i));
    }

    setCurrentWeekDays(weekDays); // Set the state with the correct week
  };

  const navigateToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const navigateToPreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const handleOpenCalendar = () => setOpenCalendar(true);

  const handleCloseCalendar = () => setOpenCalendar(false);

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
        <Button className='week-nav-btn' onClick={navigateToPreviousWeek} startIcon={<ArrowBackIosRoundedIcon />}>
          Prev<br />Week
        </Button>
        {currentWeekDays.map((weekDate, index) => (
          <Button
            key={index}
            className={weekDate.getDay() === currentDate.getDay() ? 'currentDay' : 'otherDays'}
            onClick={() => { setCurrentDate(weekDate) }}
          >
            <section>
              {weekDate.toLocaleDateString('en-US', { weekday: 'short' })[0]}
            </section>
            <section>
              {weekDate.getDate()}
            </section>
          </Button>
        ))}

        <Button className='week-nav-btn' onClick={navigateToNextWeek} endIcon={<ArrowForwardIosRoundedIcon />}>
          Next<br /> Week
        </Button>
      </section>
    </div>
  );
};

export default DateNav;
