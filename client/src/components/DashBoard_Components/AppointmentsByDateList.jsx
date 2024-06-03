import { format, addDays, subDays } from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const convertTimeToDate = (time) => {
  const [hoursMinutes, period] = time.split(' ');
  const [hours, minutes] = hoursMinutes.split(':');
  const date = new Date();
  date.setHours(
    period === 'PM' ? parseInt(hours, 10) % 12 + 12 : parseInt(hours, 10),
    parseInt(minutes, 10)
  );
  return date;
};

const AppointmentsByDateList = (props) => {
  const { appointments, currentDate, setCurrentDate } = props;
  
  const navigateToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const navigateToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const columns = [
    { field: 'time', headerName: 'Time' },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'status', headerName: 'Status' },
    { field: 'service', headerName: 'Service' },
    { field: 'clientNotes', headerName: 'Client Notes' },
    { field: 'stylistNotes', headerName: 'Stylist Notes' },
  ];

  const rows = appointments.map((appointment) => ({
    id: appointment._id,
    time: appointment.time,
    name: `${appointment.client.firstName} ${appointment.client.lastName}`,
    service: appointment.service,
    status: appointment.status,
    clientNotes: appointment.clientNotes,
    stylistNotes: appointment.stylistNotes,
  }));

  rows.sort((a, b) => convertTimeToDate(a.time) - convertTimeToDate(b.time));

  const handleRowClick = (params, event, details) => {
    console.log('Row clicked:', params.row.id);
  };

  return (
    <section>
      <div>
        <button onClick={navigateToPreviousDay}>Previous Day</button>
        <h2>
          {format(currentDate, 'yyyy-MM-dd')}
        </h2>
        <button onClick={navigateToNextDay}>Next Day</button>
      </div>

      <TableContainer >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Service</TableCell>
            <TableCell align="center">Client Notes</TableCell>
            <TableCell align="center">Stylist Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.sort((a, b) => {
    return convertTimeToDate(a.time) - convertTimeToDate(b.time);
  }).map((appointment) => (
            <TableRow
              key={appointment._id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {appointment.time}
              </TableCell>
              <TableCell align="center">{appointment.client.firstName} {appointment.client.lastName}</TableCell>
              <TableCell align="center">{appointment.service}</TableCell>
              <TableCell align="center">{appointment.status}</TableCell>
              <TableCell align="center">{appointment.clientNotes}</TableCell>
              <TableCell align="center">{appointment.stylistNotes}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


      {/* <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick}

        />
      </div> */}

    </section>
  );
};

export default AppointmentsByDateList;