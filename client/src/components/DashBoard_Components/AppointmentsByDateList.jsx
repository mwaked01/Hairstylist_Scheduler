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

import AppointmentsByDateItem from './AppointmentsByDateItem';

import '../../styles/AppointmentsByDate.scss'

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
  const { appointments, currentDate, setCurrentDate, searchDate, handleDateChange, setSortBy } = props;

  const navigateToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const navigateToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  return (
    <section>
      <header className='display-date'>
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

        <Button id='client-list-btn' endIcon={<PeopleOutlineRoundedIcon />} onClick={() => setSortBy('ClientList')}>
          Client List
        </Button>
      </header>

      <TableContainer >
        {appointments.length > 0 ? (
          <Table stickyHeader sx={{ minWidth: 700, border: 3, borderColor: "#76c9e5", borderRadius: "10px" }} aria-label="Appointments Table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Service</StyledTableCell>
                <StyledTableCell align="center">Client Notes</StyledTableCell>
                <StyledTableCell align="center">Stylist Notes</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.sort((a, b) => {
                return convertTimeToDate(a.time) - convertTimeToDate(b.time);
              }).map((appointment) => (
                <AppointmentsByDateItem
                  key={appointment._id}
                  appointment={appointment}
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