import { format, addDays, subDays } from 'date-fns';

const AppointmentsByDate = (props) => {
  const { appointments, currentDate, setCurrentDate } = props;
  const navigateToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const navigateToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
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
      <div>
        {appointments.length > 0 ? (
          appointments.sort((a, b) => new Date(a.date) - new Date(b.date)).map((appointment) => (
            <div key={appointment._id}>
              <p>Time: {appointment.time}</p>
              <p>Client: {appointment.client.firstName} {appointment.client.lastName}</p>
              <p>Service: {appointment.service}</p>
              <p>Status: {appointment.status}</p>
              <p>Client Notes: {appointment.clientNotes}</p>
              <p>Stylist Notes: {appointment.stylisttNotes}</p>

            </div>
          ))
        ) : (
          <p>No appointments for this date.</p>
        )}
      </div>
    </section>
  );
};

export default AppointmentsByDate;