import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import AppointmentsByClientItem from "./AppointmentsByClientItem";

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


const AppointmentsByClientList = (props) => {
  const { appointments, client } = props;

  return (
    <section>
      <div>
        <h2>
          {client.firstName} {client.lastName}
        </h2>
      </div>
      <TableContainer >
        <Table stickyHeader sx={{ minWidth: 700, border: 3, borderColor: "#76c9e5", borderRadius: "10px" }} aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Service</StyledTableCell>
              <StyledTableCell align="center">Client Notes</StyledTableCell>
              <StyledTableCell align="center">Stylist Notes</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((appointment) => (
                  <AppointmentsByClientItem
                    key={appointment._id}
                    appointment={appointment}
                  />
                ))
            ) : (
              <p>No appointments found for this client.</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </section>
  );
};

export default AppointmentsByClientList;