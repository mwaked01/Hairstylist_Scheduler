import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import AppointmentsItem from "./AppointmentsListItem";
import AppointmentsButton from './AppointmentsButton';
import ClientsButton from './ClientsButton';

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
  const {
    appointments,
    client,
    setSortBy,
    setCurrentDate,
    sortBY,
    setAppointmentSelected,
  } = props;

  return (
    <section className='dashboard-content'>
      <header className='dashboard-header'>
        <h2 id='client-name'>
          {client.firstName} {client.lastName}
        </h2>

        <AppointmentsButton
          setSortBy={setSortBy}
          setCurrentDate={setCurrentDate}
        />
        <ClientsButton
          setSortBy={setSortBy}
        />
      </header>
      <TableContainer className='dashboard-table' >
        <Table stickyHeader sx={{ border: 3, borderColor: "#76c9e5", borderRadius: "10px" }} aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Service</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((appointment) => (
                  appointment.status !== "changed" &&
                  <AppointmentsItem
                    key={appointment._id}
                    appointment={appointment}
                    client={client}
                    sortBY={sortBY}
                    setSortBy={setSortBy}
                    setAppointmentSelected={setAppointmentSelected}
                  />
                ))
            ) : (
              <>No appointments found for this client.</>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </section>
  );
};

export default AppointmentsByClientList;