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
  const { setFormSection, appointmentDate, setAppointmentDate, service } = props;
  const [slots, setSlots] = useState(generateTimeSlots());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const handleSelectTime = (newTime) => {
    setFormSection('NewClient')
    setAppointmentDate((prevAppointmentDate) => ({
      ...prevAppointmentDate,
      time: newTime
    }));
    // console.log(newTime)
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Helper function to add 15 minutes to a given time
  function addMinutesToTime(time, minutesToAdd) {
    let [hours, minutes] = time.match(/\d+/g).map(Number);
    const isPM = time.includes("PM");

    // Convert to 24-hour time for easier manipulation
    if (hours === 12 && !isPM) hours = 0; // 12:00 AM case
    if (isPM && hours !== 12) hours += 12; // Convert PM to 24-hour format

    // Add the minutes
    minutes += minutesToAdd;
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    }

    // Adjust back to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 or 24 to 12

    // Format time as HH:MM AM/PM
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  }

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/appointments/${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`);
      const appointments = response.data;
      // Extract time part from each appointment's date
      const takenTimes = appointments.flatMap(appointment => {
        const startTime = appointment.time;
        const appointmentDuration = appointment.service.duration / 15; // Number of 15-minute slots
        const times = [];

        for (let i = 0; i <= appointmentDuration; i++) {
          const timeSlot = addMinutesToTime(startTime, i * 15);
          times.push(timeSlot);
        }

        return times;
      });

      // Number of slots the selected service requires
      const requiredSlots = service.duration / 15;
      // Filter out taken times and slots that can't accommodate the service duration
      const filteredSlots = slots.filter((slot, index) => {
        // Check if slot is already taken
        if (takenTimes.includes(slot)) {
          return false;
        }

        // Check if there are enough consecutive available slots
        for (let i = 0; i < requiredSlots; i++) {
          const nextSlot = slots[index + i];
          if (!nextSlot || takenTimes.includes(nextSlot)) {
            return false; // Not enough consecutive slots or next slot is taken
          }
        }
        return true; // Slot is available and has enough consecutive free slots
      });

      console.log(takenTimes)
      setSlots(filteredSlots);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };


  let slotGroup = []
  return (
    <div id='time-picker'>
      <header>
        <IconButton onClick={() => { setFormSection('Service') }} type="button" className='back-btn' aria-label="search">
          <ArrowBackIosNewIcon fontSize='small' />
          Service
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
