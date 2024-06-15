import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';

import AppointmentsItem from "./AppointmentsItem";
import AppointmentsButton from './AppointmentsButton';

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
    setSearchError,
    setCurrentDate,
    sortBY,
    handleClientListButton
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
          setSearchError={setSearchError}
        />
        <Button className='dashboard-nav-btns' endIcon={<PeopleOutlineRoundedIcon />} onClick={() => handleClientListButton()}>
          Client List
        </Button>
      </header>
      <TableContainer className='dashboard-table' >
        <Table stickyHeader sx={{ border: 3, borderColor: "#76c9e5", borderRadius: "10px" }} aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Service</StyledTableCell>
              <StyledTableCell align="center">Client Notes</StyledTableCell>
              <StyledTableCell align="center">Stylist Notes</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((appointment) => (
                  <AppointmentsItem
                    key={appointment._id}
                    appointment={appointment}
                    client={client}
                    sortBY={sortBY}
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