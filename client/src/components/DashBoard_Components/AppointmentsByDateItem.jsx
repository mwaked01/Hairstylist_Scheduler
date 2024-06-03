import { format, addDays, subDays } from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';

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

const AppointmentsByDateItem = (props) => {
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

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // onRowClick={handleRowClick}

        />
      </div>

    </section>
  );
};

export default AppointmentsByDateItem;