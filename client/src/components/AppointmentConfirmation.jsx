import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Home.scss'
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import { appointmentSubmitMessage } from '../utils/helpers';

const AppointmentConfirmation = () => {
  const [loading, setLoading] = useState(true)
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    const params = new URLSearchParams(window.location.search);
    const appointmentId = params.get("appointmentId");
    try {
      console.log(`ID:${appointmentId}`)
      if (appointmentId) {
        const response = await axios.get(`${VITE_BACKEND_URL}/api/appointments/AppointmentConfirmation/${appointmentId}`);
        setConfirmedAppointment(response.data)
        setLoading(false)
        // console.log(response.data)
      } else {
        console.error('No appointmentId found in the URL');
        setLoading(false)
      }

    } catch (error) {
      console.error('Error fetching appointment info', error);
      setLoading(false)
    }
  };

  return (
    <section id="Home">
      {loading && !confirmedAppointment ? (
        <div className="loading-icon">
          loading..
        </div>
      ) : confirmedAppointment ? (
        <div>
          {appointmentSubmitMessage(navigate, confirmedAppointment.clientEmail, confirmedAppointment, "Confirm")}
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