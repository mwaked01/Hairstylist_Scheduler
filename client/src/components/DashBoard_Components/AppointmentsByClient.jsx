
const AppointmentsByClient = (props) => {
  const { appointments, client } = props;
  console.log(appointments)
  return (
    <section>

      <div>
        <h2>
          {client.firstName} {client.lastName}
        </h2>
      </div>
      <div>
        {appointments.length > 0 ? (
          appointments.sort((a, b) => new Date(a.date) - new Date(b.date)).map((appointment) => (
            <div key={appointment._id}>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Service: {appointment.service}</p>
              <p>Status: {appointment.status}</p>
              <p>Client Notes: {appointment.clientNotes}</p>
              <p>Stylist Notes: {appointment.stylisttNotes}</p>

            </div>
          ))
        ) : (
          <p>No appointments found for this client.</p>
        )}
      </div>
    </section>
  );
};

export default AppointmentsByClient;