import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Calendar from "./BookingFormComponents/Calendar";
import TimePicker from "./BookingFormComponents/TimePicker";
import ClientInfo from "./BookingFormComponents/ClientInfo";

const BookingForm = (props) => {
  const [formSection, setFormSection] = useState('Date')
  const [appointmentDate, setAppointmentDate] = useState({
    year: "",
    month: "",
    day: "",
    time: ""
  })
  const [date, setDate] = useState(new Date())
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    clientNotes: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointment = {
        date: `${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`,
        time: appointmentDate.time,
        service: client.service,
        status: "booked",
        clientNotes: client.clientNotes
      };

      const searchResponse = await axios.get('http://localhost:8080/api/clients/searchByEmailAndPhone', {
        params: {
          email: client.email,
          phone: client.phone
        }
      });

      if (searchResponse.data) {
        // Client exists, add a new appointment to this client
        const addAppointmentResponse = await axios.post(`http://localhost:8080/api/clients/addAppointment/${searchResponse.data._id}`, appointment);
        console.log('Added appointment to existing client:', addAppointmentResponse.data);
      } else {
        // Client does not exist, create a new client
        const response = await axios.post('http://localhost:8080/api/clients', { ...client, appointment });
        console.log('Client information submitted:', response.data);
      }

      navigate('/');
    } catch (error) {
      console.error('Error submitting client information:', error);
    }
  };

  return (
    <div>
      {formSection === 'Date' ?
        <Calendar
          date={date}
          setDate={setDate}
          appointmentDate={appointmentDate}
          setAppointmentDate={setAppointmentDate}
          setFormSection={setFormSection}
        /> : formSection === 'Time' ?
          <TimePicker
            appointmentDate={appointmentDate}
            setAppointmentDate={setAppointmentDate}
            setFormSection={setFormSection}
          /> : formSection === 'ClientInfo' ?
            <ClientInfo
              client={client}
              setClient={setClient}
              appointmentDate={appointmentDate}
              setAppointmentDate={setAppointmentDate}
              handleSubmit={handleSubmit}
              setFormSection={setFormSection}
            /> :
            <p>none</p>
      }

    </div>
  )
}

export default BookingForm;