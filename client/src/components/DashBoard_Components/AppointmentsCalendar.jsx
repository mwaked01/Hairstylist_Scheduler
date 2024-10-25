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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AppointmentsItem from './AppointmentsItem';
import { useEffect, useState } from 'react';

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



const AppointmentsCalendar = (props) => {
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

  const updateAppointmentNotes = (id, newNotes) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === id
          ? { ...appointment, stylistNotes: newNotes }
          : appointment
      )
    );
  };

  const handleOpenCalendar = () => setOpenCalendar(true);

  const handleCloseCalendar = () => setOpenCalendar(false);

  return (
    <section id='dashboard-calendar'>

      <header className='button-group'>
        <Button className='dashboard-nav-btns' endIcon={<AddCircleOutlineIcon />} onClick={() => handleClientListButton()}>
          Add Appointment
        </Button>

        <Button className='dashboard-nav-btns' endIcon={<PeopleOutlineRoundedIcon />} onClick={() => handleClientListButton()}>
          Client List
        </Button>
      </header>

      <div id='date-nav'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Button
            endIcon={<CalendarMonthIcon />}
            onClick={handleOpenCalendar}
          >
            {currentDate.toLocaleDateString('en-US', { month: 'long' })}
            {format(currentDate, ' yyyy')}
          </Button>
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

export default AppointmentsCalendar;