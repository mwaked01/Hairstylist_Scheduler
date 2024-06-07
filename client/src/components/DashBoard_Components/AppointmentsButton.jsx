import Button from '@mui/material/Button';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';

const AppointmentsButton = (props) => {
  const {
    setSortBy,
    setCurrentDate
  } = props;

  const handleAppointmentButton = () => {
    setSortBy('Date')
    setCurrentDate(new Date())
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