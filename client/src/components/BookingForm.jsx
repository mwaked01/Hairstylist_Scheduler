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
  
  const formatDateToISOString = (dateInput) => {
    const [time, period] = dateInput.time.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const date = new Date(
      dateInput.year,
      dateInput.month,
      dateInput.day,
      hours,
      minutes
    );

    return date.toISOString();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formatDateToISOString(appointmentDate))
      const appointment = {
        date: `${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`,
        time: appointmentDate.time,
        service: client.service,
        status: "booked",
        clientNotes: client.clientNotes
      };
      const response = await axios.post('http://localhost:8080/api/clients', { ...client, appointment });
      console.log('Client information submitted:', response.data);
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