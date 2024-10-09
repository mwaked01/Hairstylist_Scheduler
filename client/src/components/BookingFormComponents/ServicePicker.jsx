import React, { useState, useEffect } from 'react';
import '../../styles/Booking.scss'
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
      <header>
        <IconButton onClick={() => { setFormSection('Date') }} type="button" className='back-btn' aria-label="search">
          <ArrowBackIosNewIcon fontSize='small' />
          Calendar
        </IconButton>
        <h2 className='date'>{months[appointmentDate.month - 1]} {appointmentDate.day}, {appointmentDate.year}</h2>
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
