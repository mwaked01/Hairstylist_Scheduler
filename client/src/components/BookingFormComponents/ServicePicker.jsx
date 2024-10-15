import React, { useState, useEffect } from 'react';
// import '../../styles/Booking.scss'

import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const ServicePicker = (props) => {
  const { setFormSection, appointmentDate, setService, setClient } = props;

  const services = [
    ['Consultation', 30],  // 30 minutes for Consultation
    ['Cut - Bang Shaping', 30],  // 30 minutes for Hair Cut
    ['Cut - Women\'s', 60],  // 60 minutes for Hair Cut
    ['Cut - Men\'s', 30],  // 30 minutes for Hair Cut
    ['Cut - Child\'s (Under 10)', 30],  // 30 minutes for Hair Cut
    ['Color', 60],     // 60 minutes for Color
    ['Style', 45]      // 45 minutes for Style
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSelectService = (newService, duration) => {
    setService({ name: newService, duration })
    setClient(prevClient => ({
      ...prevClient,
      ['service']: { name: newService, duration }
    }));
    setFormSection('Time')
  }

  return (
    <div id='service-picker'>
      <header className='Booking-Nav'>
        <IconButton onClick={() => { setFormSection('Date') }} type="button" className='back-btn' aria-label="search">
          <ArrowBackIosNewIcon fontSize='small' />
          Calendar
        </IconButton>
        <div className='date'>{months[appointmentDate.month - 1]} {appointmentDate.day}, {appointmentDate.year}</div>
      </header>
      <section id='service-list'>
        {services.map(([name, duration]) => (
          <div key={name} className='service-item' onClick={() => { handleSelectService(name, duration) }}>
            <div  >
              {name}
            </div>
            <div >
              ({duration} mins)
            </div>
          </div>

        ))}
      </section>

    </div>
  );
};

export default ServicePicker;
