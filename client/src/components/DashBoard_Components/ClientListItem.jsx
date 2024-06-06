
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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


const ClientListItem = (props) => {
  const {
    client,
    setClientSelected,
    setSortBy,
    setAppointments
  } = props;

  const handleClientSelect = async () => {
    setClientSelected(client)
    setAppointments(client.appointments)
    setSortBy('Client')
  };

  return (
    <StyledTableRow key={client._id} onClick={handleClientSelect}>
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
  );
};

export default ClientListItem;