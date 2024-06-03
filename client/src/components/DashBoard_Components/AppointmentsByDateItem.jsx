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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AppointmentsByDateItem = (props) => {
  const { appointment } = props;

  return (
    <StyledTableRow
      key={appointment._id}
    >
      <StyledTableCell component="th" scope="row">
        {appointment.time}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.client.firstName} {appointment.client.lastName}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.service}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.status}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.clientNotes}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.stylistNotes}
      </StyledTableCell>
    </StyledTableRow>

  );
};

export default AppointmentsByDateItem;