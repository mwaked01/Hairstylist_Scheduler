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
      day: newDate.$D < 10 ? `0${newDate.$D }` : `${newDate.$D}`,
      time: ""
    });
    // console.log(`${newDate.$M} ${newDate.$D}, ${newDate.$y}`)
    setFormSection('Service')
  }

  const shouldDisableDate = (day) => {
    return day.day() === 0; // 0 is Sunday
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