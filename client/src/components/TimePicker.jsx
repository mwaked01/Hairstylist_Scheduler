import React, { useState, useEffect } from 'react';
import "../styles/Booking.scss"
import axios from 'axios';

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

  const [slots, setSlots] = useState(generateTimeSlots());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/appointments/dates');
        const appointments = response.data;
        // Extract time part from each appointment's date
        const takenTimes = appointments.map(appointment => {
          const time = new Date(appointment.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
          console.log(time)
          return time;
        });

        // Filter out taken times from slots
        const filteredSlots = slots.filter(slot => !takenTimes.includes(slot));

        setSlots(filteredSlots);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <div className='slots'>
        {slots.map(slot => (
          <div key={slot} className='slot'>
            <div>{slot}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TimePicker;
