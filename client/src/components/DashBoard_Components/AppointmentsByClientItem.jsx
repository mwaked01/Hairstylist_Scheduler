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
}));

const AppointmentsByClientItem = (props) => {
  const { appointment } = props;
  return (
    <StyledTableRow
      key={appointment._id}
    >
      <StyledTableCell component="th" scope="row">
        {appointment.date}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.time} 
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.status}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.service}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.clientNotes}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment.stylistNotes}
      </StyledTableCell>
    </StyledTableRow>
    // <section>

    //   <div>
    //     <h2>
    //       {client.firstName} {client.lastName}
    //     </h2>
    //   </div>
    //   <div>
    //     {appointments.length > 0 ? (
    //       appointments.sort((a, b) => new Date(a.date) - new Date(b.date)).map((appointment) => (
    //         <div key={appointment._id}>
    //           <p>Date: {appointment.date}</p>
    //           <p>Time: {appointment.time}</p>
    //           <p>Service: {appointment.service}</p>
    //           <p>Status: {appointment.status}</p>
    //           <p>Client Notes: {appointment.clientNotes}</p>
    //           <p>Stylist Notes: {appointment.stylisttNotes}</p>

    //         </div>
    //       ))
    //     ) : (
    //       <p>No appointments found for this client.</p>
    //     )}
    //   </div>
    // </section>
  );
};

export default AppointmentsByClientItem;