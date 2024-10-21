import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const Calendar = (props) => {
  const { date, setDate, setFormSection, setAppointmentDate } = props;


  const handleSelectDay = (newDate) => {
    setDate(newDate)
    setAppointmentDate({
      year: newDate.$y,
      month: newDate.$M < 9 ? `0${newDate.$M + 1}` : `${newDate.$M + 1}`,
      day: newDate.$D < 10 ? `0${newDate.$D}` : `${newDate.$D}`,
      time: ""
    });
    setFormSection('Service')
  }

  const shouldDisableDate = (day) => {
    const now = new Date();
    const currentDayOfWeek = now.getDay();
    const currentTime = now.toTimeString().slice(0, 5);

    // Disable Sundays (0) and Mondays (1)
    if (day.day() === 0 || day.day() === 1) {
      return true;
    }
    // Disable Saturdays (6) if current time is past 15:30
    if (day.day() === currentDayOfWeek && currentDayOfWeek === 6 && currentTime >= '15:30') {
      return true;
    }
    // Disable other days only if it's the same day and the current time is past 19:00
    if (day.day() === currentDayOfWeek && currentTime >= '19:00') {
      return true;
    }

    // Enable all other cases
    return false;
  };


  const handleChange = (newValue, selectionState, selectedView) => {
    if (selectedView === 'day') {
      handleSelectDay(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={dayjs(date)}
        maxDate={dayjs(`${new Date().getFullYear() + 1},${new Date().getMonth()},${new Date().getDate()}`)}
        disablePast
        shouldDisableDate={shouldDisableDate}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
}

export default Calendar;