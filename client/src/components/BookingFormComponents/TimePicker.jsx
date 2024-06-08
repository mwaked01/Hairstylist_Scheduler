import React, { useState, useEffect } from 'react';
import '../../styles/Booking.scss'
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 8; i <= 18; i++) {
    // Format hours with leading zero if less than 10
    const hour = i < 10 ? `0${i}` : `${i}`;

    if (i < 12) {
      slots.push(`${hour}:00 AM`);
      slots.push(`${hour}:15 AM`);
      slots.push(`${hour}:30 AM`);
      slots.push(`${hour}:45 AM`);
    } else if (i === 12) {
      slots.push(`${hour}:00 PM`);
      slots.push(`${hour}:15 PM`);
      slots.push(`${hour}:30 PM`);
      slots.push(`${hour}:45 PM`);
    } else {
      const hour12 = i - 12 < 10 ? `0${i - 12}` : `${i - 12}`;
      slots.push(`${hour12}:00 PM`);
      slots.push(`${hour12}:15 PM`);
      slots.push(`${hour12}:30 PM`);
      slots.push(`${hour12}:45 PM`);
    }
  }
  return slots;
};

const TimePicker = (props) => {
  const { setFormSection, appointmentDate, setAppointmentDate } = props;
  const [slots, setSlots] = useState(generateTimeSlots());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const handleSelectTime = (newTime) => {
    setFormSection('ClientInfo')
    setAppointmentDate((prevAppointmentDate) => ({
      ...prevAppointmentDate,
      time: newTime
    }));
    // console.log(newTime)
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/appointments/${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`);
      const appointments = response.data;
      // Extract time part from each appointment's date
      const takenTimes = appointments.map(appointment => {
        const time = appointment.time;
        return time;
      });
      // Filter out taken times from slots
      const filteredSlots = slots.filter(slot => !takenTimes.includes(slot));
      setSlots(filteredSlots);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };


  let slotGroup = []
  return (
    <div id='time-picker'>
      <header>
        <IconButton onClick={() => { setFormSection('Date') }} type="button" className='back-btn' aria-label="search">
          <ArrowBackIosNewIcon fontSize='small' />
          Calendar
        </IconButton>
        <h2 className='date'>{months[appointmentDate.month - 1]} {appointmentDate.day}, {appointmentDate.year}</h2>
      </header>

      <div className='slots'>
        {slots.map((slot, index) => {
          const firstTwoChars = slot.slice(0, 2);
          const previousFirstTwoChars = index > 0 ? slots[index - 1].slice(0, 2) : null;

          if (index === 0 || firstTwoChars === previousFirstTwoChars) {
            slotGroup.push(
              <div className='slot' key={slot} onClick={() => { handleSelectTime(slot) }}>
                {slot}
              </div>
            );
          } else {
            const group = slotGroup;
            slotGroup = [
              <div className='slot' key={slot} onClick={() => { handleSelectTime(slot) }}>
                {slot}
              </div>
            ];

            return (
              <React.Fragment key={index}>
                <div className='slot-group'>
                  {group}
                </div>
              </React.Fragment>
            );
          }

          if (index === slots.length - 1) {
            const group = slotGroup;
            return (
              <div className='slot-group' key={index}>
                {group}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default TimePicker;
