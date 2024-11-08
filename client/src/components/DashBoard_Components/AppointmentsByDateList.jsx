import { format, addDays, subDays } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AppointmentsItem from './AppointmentsItem';

// import '../../styles/DashBoard.scss'

const convertTimeToDate = (time) => {
  const [hoursMinutes, period] = time.split(' ');
  const [hours, minutes] = hoursMinutes.split(':');
  const date = new Date();
  date.setHours(
    period === 'PM' ? parseInt(hours, 10) % 12 + 12 : parseInt(hours, 10),
    parseInt(minutes, 10)
  );
  return date;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#76c9e5',
    color: theme.palette.common.white,
    fontSize: '1em',
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const AppointmentsByDateList = (props) => {
  const {
    appointments,
    setAppointments,
    currentDate,
    setCurrentDate,
    searchDate,
    handleDateChange,
    handleClientListButton,
    sortBY,
    client
  } = props;

  const navigateToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const navigateToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const updateAppointmentNotes = (id, newNotes) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === id
          ? { ...appointment, stylistNotes: newNotes }
          : appointment
      )
    );
  };

  return (
    <section className='dashboard-content'>
      <header className='dashboard-header'>
        <div id='date-nav'>
          <Button id='prev_day_btn' onClick={navigateToPreviousDay} startIcon={<ArrowBackIosRoundedIcon />}>
            Prev<br />Day
          </Button>
          <h3 id='date'>
            {format(currentDate, 'yyyy-MM-dd')}
          </h3>
          <Button id='next_day_btn' onClick={navigateToNextDay} endIcon={<ArrowForwardIosRoundedIcon />}>
            Next<br /> Day
          </Button>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Search by Date"
            value={dayjs(searchDate)}
            onChange={handleDateChange}
          />
        </LocalizationProvider>

        <Button className='dashboard-nav-btns' endIcon={<PeopleOutlineRoundedIcon />} onClick={() => handleClientListButton()}>
          Client List
        </Button>
      </header>

      <TableContainer className='dashboard-table'>
        {appointments.length > 0 ? (
          <Table stickyHeader sx={{ border: 3, borderColor: "#76c9e5", borderRadius: "10px" }} aria-label="Appointments Table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Service</StyledTableCell>
                <StyledTableCell align="center">Client Notes</StyledTableCell>
                <StyledTableCell align="center">Stylist Notes</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.sort((a, b) => {
                return convertTimeToDate(a.time) - convertTimeToDate(b.time);
              }).map((appointment) => (
                <AppointmentsItem
                  key={appointment._id}
                  appointment={appointment}
                  setAppointments={setAppointments}
                  client={client}
                  updateAppointmentNotes={updateAppointmentNotes}
                  sortBY={sortBY}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No appointments found for this day.</p>
        )}
      </TableContainer>
    </section>
  );
};

export default AppointmentsByDateList;