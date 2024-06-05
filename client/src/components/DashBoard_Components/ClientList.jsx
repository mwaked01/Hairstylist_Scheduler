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
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';

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


const ClientList = (props) => {
  const {
    clients,
    setSortBy,
    searchQuery,
    setSearchQuery,
    handleClientSearch
  } = props;

  return (
    <section>
      <div>
        <InputBase
          placeholder="Search client by name, phone #, or email"
          inputProps={{ 'aria-label': 'client search' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton onClick={handleClientSearch} type="button" sx={{ p: '10px' }} aria-label="search">
          <PersonSearchOutlinedIcon />
        </IconButton>

        <Button id='appointment-list-btn' endIcon={<CalendarMonthOutlinedIcon />} onClick={() => setSortBy('Date')}>
          Apointments
        </Button>
      </div>

      <TableContainer >
        <Table stickyHeader sx={{ minWidth: 700, border: 3, borderColor: "#76c9e5", borderRadius: "10px" }} aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Phone #</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Upcoming Appointment</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {clients.length > 0 ? ( */}
            {clients.map((client) => (
              <StyledTableRow key={client._id}>
                <StyledTableCell component="th" scope="row">
                  {client.firstName} {client.lastName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {client.phone}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {client.email}
                </StyledTableCell>

                {client.appointments.length > 0 ? (
                  <>
                    {client.appointments.some(appointment => appointment.status === 'booked') ? (
                      <StyledTableCell align="center">
                        <EventAvailableRoundedIcon sx={{ color: "#63E6BE" }} />
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="center">
                        <EventBusyRoundedIcon sx={{ color: "#E66565" }} />
                      </StyledTableCell>
                    )}
                  </>
                ) : (
                  <StyledTableCell align="center">
                    <EventBusyRoundedIcon sx={{ color: "#E66565" }} />
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
            {/* )  */}
            {/* : (
              <p>No clients found.</p>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>

    </section>
  );
};

export default ClientList;