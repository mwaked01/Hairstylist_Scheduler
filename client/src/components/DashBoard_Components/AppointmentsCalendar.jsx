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

import AppointmentsItem from './AppointmentsItem';
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
    client
  } = props;


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

      <DateNav
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      handleDateChange={handleDateChange}
      />

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