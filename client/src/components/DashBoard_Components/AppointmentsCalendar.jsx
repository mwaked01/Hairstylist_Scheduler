import { useEffect, useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import AppointmentsItem from './AppointmentsListItem';
import DateNav from '../DateNav';

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
    handleDateChange,
    handleClientListButton,
    sortBY,
    setSortBy,
    client,
    setAppointmentSelected
  } = props;
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleOpenCalendar = () => setOpenCalendar(true);

  const handleCloseCalendar = () => setOpenCalendar(false);

  const navigateToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
    handleDateChange(dayjs(addDays(currentDate, 1)))
  };

  const navigateToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
    handleDateChange(dayjs(subDays(currentDate, 1)))
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
    <section id='dashboard-calendar'>

      <header className='button-group'>
        <Button className='dashboard-nav-btns' endIcon={<AddCircleOutlineIcon />} onClick={() => handleClientListButton()}>
          Add Appointment
        </Button>

        <Button className='dashboard-nav-btns' endIcon={<PeopleOutlineRoundedIcon />} onClick={() => handleClientListButton()}>
          Client List
        </Button>
      </header>

      <section>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Button
            className='week-nav-btn'
            onClick={navigateToPreviousDay}
            startIcon={<ArrowLeftIcon />}
          >
            Prev<br />Day
          </Button>
          <Button
            endIcon={<CalendarMonthIcon />}
            onClick={handleOpenCalendar}
          >
            {currentDate.toLocaleDateString('en-US', { weekday: 'short' })}{' '}
            {currentDate.toLocaleDateString('en-US', { month: 'short' })}
            {format(currentDate, ' dd, yyyy')}
          </Button>
          <DatePicker
            open={openCalendar}
            onClose={handleCloseCalendar}
            value={dayjs(currentDate)}
            onChange={handleDateChange}
            disablePast={false}
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
          <Button
            className='week-nav-btn'
            onClick={navigateToNextDay}
            endIcon={<ArrowRightIcon />}
          >
            Next<br /> Day
          </Button>
        </LocalizationProvider>
      </section>
      <TableContainer className='dashboard-table'>
        {appointments.length > 0 ? (
          <Table stickyHeader sx={{ border: 3, borderColor: "#76c9e5", borderRadius: "10px" }} aria-label="Appointments Table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                {/* <StyledTableCell align="center">Status</StyledTableCell> */}
                <StyledTableCell align="center">Service</StyledTableCell>
                {/* <StyledTableCell align="center">Client Notes</StyledTableCell>
                <StyledTableCell align="center">Stylist Notes</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.sort((a, b) => {
                return convertTimeToDate(a.time) - convertTimeToDate(b.time);
              }).map((appointment) => (
                appointment.status !== "changed"&&
                <AppointmentsItem
                  key={appointment._id}
                  appointment={appointment}
                  setAppointments={setAppointments}
                  client={client}
                  updateAppointmentNotes={updateAppointmentNotes}
                  sortBY={sortBY}
                  setSortBy={setSortBy}
                  setAppointmentSelected={setAppointmentSelected}
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