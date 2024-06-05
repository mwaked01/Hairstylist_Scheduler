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

import ClientListItem from './ClientListItem';

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
    setAppointments
  } = props;

  return (
    <section>
      <header className='dashboard-header'>
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
        <Button className='dashboard-nav-btns' endIcon={<CalendarMonthOutlinedIcon />} onClick={() => setSortBy('Date')}>
          Apointments
        </Button>
      </header>

      <TableContainer >
        {clients.length > 0 ?
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
          : <>No Clients Found</>
        }

      </TableContainer>

    </section>
  );
};

export default ClientList;