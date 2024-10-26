import Button from '@mui/material/Button';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const AppointmentsButton = (props) => {
  const {
    setSortBy,
    setCurrentDate,
    setSearchError,
  } = props;

  const handleAppointmentButton = () => {
    setSortBy('Calendar')
    setCurrentDate(new Date())
    setSearchError('')
  }

  return (
    <Button
      className='dashboard-nav-btns'
      endIcon={<CalendarMonthOutlinedIcon />}
      onClick={handleAppointmentButton}
    >
      Appointments
    </Button>
  );
};

export default AppointmentsButton;