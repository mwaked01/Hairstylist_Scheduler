import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Calendar from "./BookingFormComponents/Calendar";
import TimePicker from "./BookingFormComponents/TimePicker";
import ClientInfo from "./BookingFormComponents/ClientInfo";
import ServicePicker from "./BookingFormComponents/ServicePicker";

import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const SERVICE_ID = "service_75bbx39";
const TEMPLATE_ID = "template_by4xcpt";
const USER_ID = "n_JyyoXkMteWYmNiR";


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
      // if (returningClient) {
      //   const response = await axios.post(`http://localhost:8080/api/clients/addAppointment/${returningClient}`, {  appointment });
      //   console.log('Appointment information submitted:', response.data);
      // } else {
      const response = await axios.post('http://localhost:8080/api/clients', { ...client, appointment });
      console.log('New Client information submitted:', response.data);
      // }

      // emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      //   .then((result) => {
      //     Swal.fire({
      //       icon: 'success',
      //       title: `Confirmation email has been sent to ${client.email}`,
      //     })
      //     navigate('/')
      //   }, (error) => {
      //     Swal.fire({
      //       icon: 'error',
      //       title: 'Ooops, something went wrong',
      //       text: error.text,
      //     })
      //   });
      // e.target.reset()

      // navigate('/');
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
              /> :
              <p>none</p>
      }

    </div>
  )
}

export default BookingForm;