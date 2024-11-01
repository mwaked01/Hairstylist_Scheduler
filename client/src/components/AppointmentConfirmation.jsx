import React, { useState, useEffect } from 'react';

import '../styles/Home.scss'
import axios from 'axios';
const VITE_IP = import.meta.env.VITE_IP;

const AppointmentConfirmation = (props) => {
  const { shopInfo, loading, setLoading } = props
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  useEffect(() => {
    setLoading(true)
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const appointmentId = params.get("appointmentId");
      if (appointmentId) {
        const response = await axios.get(`http://${VITE_IP}:8080/api/appointments/AppointmentConfirmation/${appointmentId}`);
        setConfirmedAppointment(response.data)
        setLoading(false)
        // console.log(response.data.service)
      } else {
        console.error('No appointmentId found in the URL');
      }

    } catch (error) {
      console.error('Error fetching appointment info', error);
    }
  }

  return (
    <section id="Home">
      {loading && confirmedAppointment === null ? (
        <div className="loading-icon">
          loading..
        </div>
      ) : confirmedAppointment ? (
        <div>
          {confirmedAppointment.service.name}
        </div>
      ) : (
        <div>
          Unable to load appointment details.
        </div>
      )}
    </section>
  );
  
};

export default AppointmentConfirmation;