import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

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
    backgroundColor: '#cae5eeef',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#8fadb7e1',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: 'rgba(138, 224, 138, 0.904)',
    cursor: 'pointer',
  }
}));


const AppointmentsItem = (props) => {
  const { appointment, sortBY, setSortBy, setAppointmentSelected,client } = props;

  const handleAppointmentSelect = () => {
    setSortBy('Appointment')
    setAppointmentSelected(appointment)
  }

  return (
    <StyledTableRow
      key={appointment._id}
      onClick={handleAppointmentSelect}
    >
      <StyledTableCell component="th" scope="row">
        {sortBY === 'Date' || sortBY === 'Calendar' ?
          appointment.time :
          appointment.date
        }
      </StyledTableCell>
      <StyledTableCell align="center">
        {sortBY === 'Date' || sortBY === 'Calendar' ?
          `${appointment.client.firstName} ${appointment.client.lastName}` :
          appointment.time
        }
      </StyledTableCell>

      <StyledTableCell align="center">
        {appointment.service.name}
      </StyledTableCell>

    </StyledTableRow>

  );
};

export default AppointmentsItem;