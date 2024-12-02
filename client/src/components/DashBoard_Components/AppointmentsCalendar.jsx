import { useState } from 'react';
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

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import AppointmentsItem from './AppointmentsListItem';
import ClientsButton from './ClientsButton';


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

  return (
    <section id='dashboard-calendar'>

      <header className='button-group'>
        <Button className='dashboard-nav-btns' endIcon={<AddCircleOutlineIcon />} onClick={() => handleClientListButton()}>
          Add Appointment
        </Button>
        <ClientsButton
          setSortBy={setSortBy}
        />
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
                <StyledTableCell align="center">Client</StyledTableCell>
                <StyledTableCell align="center">Service</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.sort((a, b) => {
                return convertTimeToDate(a.time) - convertTimeToDate(b.time);
              }).map((appointment) => (
                appointment.status !== "changed" &&
                <AppointmentsItem
                  key={appointment._id}
                  appointment={appointment}
                  setAppointments={setAppointments}
                  client={client}
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