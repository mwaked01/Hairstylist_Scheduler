import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const Calendar = (props) => {
  const { date, setDate, setFormSection } = props;
  const handleSelectDay = (newDate) => {
    setDate(newDate)
    setFormSection('Time')
  }

  const shouldDisableDate = (day) => {
    return day.day() === 0; // 0 is Sunday
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={dayjs(date)}
        maxDate={dayjs(`${new Date().getFullYear() + 1},${new Date().getMonth()},${new Date().getDate()}`)}
        disablePast
        shouldDisableDate={shouldDisableDate}
        onChange={(newValue) => handleSelectDay(newValue)}
      />
    </LocalizationProvider>
  );
}

export default Calendar;