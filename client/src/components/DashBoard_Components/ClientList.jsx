import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';

import ClientListItem from './ClientListItem';
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

const ClientList = (props) => {
  const {
    clients,
    setSortBy,
    searchQuery,
    setSearchQuery,
    handleClientSearch,
    setClientSelected,
    setAppointments,
    setCurrentDate,
    searchError
  } = props;

  return (
    <section className='dashboard-content'>
      <header className='dashboard-header'>
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
          </div>
          <div className='error-message'>
            {searchError !== "" && searchError}
          </div>
        </section>
        <AppointmentsButton
          setSortBy={setSortBy}
          setCurrentDate={setCurrentDate}
        />
      </header>

      <TableContainer className='dashboard-table'>
        {clients.length > 0 ?
          <Table stickyHeader sx={{ border: 3, borderColor: "#76c9e5", borderRadius: "10px" }} aria-label="Appointments Table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Phone #</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Upcoming Appointment</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <ClientListItem
                  key={client._id}
                  client={client}
                  setClientSelected={setClientSelected}
                  setSortBy={setSortBy}
                  setAppointments={setAppointments}
                />
              ))}
            </TableBody>
          </Table>
          : <div className='error-message'>No Clients Found</div>
        }

      </TableContainer>

    </section>
  );
};

export default ClientList;