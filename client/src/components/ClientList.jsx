import { useState, useEffect } from 'react';
import axios from 'axios';

const ClientList = (props) => {
  const [clients, setClients] = useState([]);

  //Read data from from server /clients
  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await axios.get('http://localhost:3000/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients info', error);
      }
    }
    fetchClients();
  }, []);


  return (
    <section>
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            {client.name} - {client.phone} - {client.email}
            <ul>
              {client.appointments.map((appointment) => (
                <li key={appointment._id}>
                  {new Date(appointment.date).toLocaleDateString()} - {appointment.service} - {appointment.notes}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ClientList;