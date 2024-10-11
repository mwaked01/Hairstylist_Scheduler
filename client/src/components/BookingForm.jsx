import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Calendar from "./BookingFormComponents/Calendar";
import TimePicker from "./BookingFormComponents/TimePicker";
import ClientInfo from "./BookingFormComponents/ClientInfo";
import ServicePicker from "./BookingFormComponents/ServicePicker";

import { sendConfirmationEmail } from '../utils/helpers';


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

  const [service, setService] = useState({ name: 'Consultation', duration: 30 })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const appointment = {
        date: `${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`,
        time: appointmentDate.time,
        service: client.service,
        status: "pending",
        clientNotes: client.clientNotes
      };

      const response = await axios.post('http://localhost:8080/api/clients', { ...client, appointment });
      console.log('New Client information submitted:', response.data);

      sendConfirmationEmail(appointment, client, null, navigate)

      e.target.reset()
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
        /> : formSection === 'Service' ?
          <ServicePicker
            appointmentDate={appointmentDate}
            setService={setService}
            setFormSection={setFormSection}
            setClient={setClient}
          /> :
          formSection === 'Time' ?
            <TimePicker
              appointmentDate={appointmentDate}
              setAppointmentDate={setAppointmentDate}
              setFormSection={setFormSection}
              service={service}
            /> : formSection === 'ClientForm' || formSection === 'ClientSearch' ?
              <ClientInfo
                client={client}
                setClient={setClient}
                appointmentDate={appointmentDate}
                setAppointmentDate={setAppointmentDate}
                service={service}
                handleSubmit={handleSubmit}
                setFormSection={setFormSection}
                formSection={formSection}
                sendConfirmationEmail={sendConfirmationEmail}
              /> :
              <p>none</p>
      }

    </div>
  )
}

export default BookingForm;