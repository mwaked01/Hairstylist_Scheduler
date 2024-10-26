import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Calendar from "./BookingFormComponents/Calendar";
import DateNav from "./DateNav";
import TimePicker from "./BookingFormComponents/TimePicker";
import ClientInfo from "./BookingFormComponents/ClientInfo";
import ServicePicker from "./BookingFormComponents/ServicePicker";

import '../styles/Booking.scss'

import { sendConfirmationEmail } from '../utils/helpers';

const Booking = (props) => {
  const { services } = props
  const [formSection, setFormSection] = useState('Service')
  const [appointmentDate, setAppointmentDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1, 
    day: new Date().getDate(),
    time: null
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

  const handleSelectDay = (newDate) => {
    // console.log(newDate)
    setDate(new Date(newDate))
    setAppointmentDate({
      year: newDate.$y,
      month: newDate.$M < 9 ? `0${newDate.$M + 1}` : `${newDate.$M + 1}`,
      day: newDate.$D < 10 ? `0${newDate.$D}` : `${newDate.$D}`,
      time: ""
    });
  }

  return (
    <div id="Booking">
      {
        formSection === 'Service' ?
          <ServicePicker
            appointmentDate={appointmentDate}
            services={services}
            setService={setService}
            setFormSection={setFormSection}
            setClient={setClient}
          /> :
          formSection === 'Date' ?
            <section id="date-time-selection">
              <DateNav
                currentDate={date}
                setCurrentDate={setDate}
                handleDateChange={handleSelectDay}
                optionalButton = {'Service'}
                handleOptionalButton={setFormSection}
              />
              <TimePicker
                date={date}
                appointmentDate={appointmentDate}
                setAppointmentDate={setAppointmentDate}
                setFormSection={setFormSection}
                service={service}
              />
            </section> :
            formSection === 'ClientForm' || formSection === 'ClientSearch' ?
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

export default Booking;