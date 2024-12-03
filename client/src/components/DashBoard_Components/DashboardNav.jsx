import Button from '@mui/material/Button';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

const DashboardNav = (props) => {
  const {
    setSortBy,
    setCurrentDate,
    sortBy
  } = props;

  const navigate = useNavigate();

  const handleClientListButton = () => {
    setSortBy('ClientList');
  }

  const handleAppointmentButton = () => {
    setSortBy('Calendar')
    setCurrentDate(new Date())
  }

  const handleAddAppointmenttButton = () => {
    navigate('/Booking')
  }

  return (
    <section>
      {sortBy !== 'Calendar' &&
        <Button
          className='dashboard-nav-btns'
          endIcon={<CalendarMonthOutlinedIcon />}
          onClick={handleAppointmentButton}
        >
          Appointments
        </Button>
      }
      {sortBy !== 'ClientList' &&
        <Button
          className='dashboard-nav-btns'
          endIcon={<PeopleOutlineRoundedIcon />}
          onClick={handleClientListButton}
        >
          Clients
        </Button>
      }
      {sortBy !== 'Appointment' &&
        <Button
          className='dashboard-nav-btns'
          endIcon={<AddCircleOutlineIcon />}
          onClick={handleAddAppointmenttButton}>
          Add Appointment
        </Button>
      }
    </section>
  );
};

export default DashboardNav;