import { format, addDays, subDays } from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AppointmentsByDateList = (props) => {
  const { appointments, currentDate, setCurrentDate } = props;

  const navigateToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const navigateToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  return (
    <section>
      <div>
        <button onClick={navigateToPreviousDay}>Previous Day</button>
        <h2>
          {format(currentDate, 'yyyy-MM-dd')}
        </h2>
        <button onClick={navigateToNextDay}>Next Day</button>
      </div>

      <TableContainer >
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
              <StyledTableRow
                key={appointment._id}
              >
                <StyledTableCell component="th" scope="row">
                  {appointment.time}
                </StyledTableCell>
                <StyledTableCell align="center">{appointment.client.firstName} {appointment.client.lastName}</StyledTableCell>
                <StyledTableCell align="center">{appointment.service}</StyledTableCell>
                <StyledTableCell align="center">{appointment.status}</StyledTableCell>
                <StyledTableCell align="center">{appointment.clientNotes}</StyledTableCell>
                <StyledTableCell align="center">{appointment.stylistNotes}</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default AppointmentsByDateList;