import React, { useState, useEffect } from 'react';
import "../styles/ClientInfo.scss"

import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const ClientInfo = (props) => {
  const { client, setClient, handleSubmit, setFormSection, appointmentDate, setAppointmentDate } = props;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients');
        const clients = response.data;
        const currentClients = clients.map(client => {
          const firstName = (client.firstName);
          // console.log(firstName)
          return firstName;
        });
        //add logic to check if client exists
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prevClient => ({
      ...prevClient,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>{months[appointmentDate.month]} {appointmentDate.day}, {appointmentDate.year} at {appointmentDate.time}</h2>
      <form onSubmit={handleSubmit} className='client-form'>
        <div className='client-form-input'>
          <section >
            <div className='input'>
              <TextField
                required
                id="first-name"
                label="First Name"
                variant="filled"
                name="firstName"
                value={client.firstName}
                onChange={handleChange}
              />
            </div>
            <div className='input'>
              <TextField
                required
                id="last-name"
                label="Last Name"
                variant="filled"
                name="lastName"
                value={client.lastName}
                onChange={handleChange}
              />
            </div>
            <FormControl fullWidth variant="filled" required>
              <div className='input'>
                <InputLabel
                  id="service-label">Service Type</InputLabel>
                <Select
                  fullWidth
                  labelId="service-label"
                  id="service"
                  name="service"
                  value={client.service}
                  onChange={handleChange}
                >
                  <MenuItem value="Hair Cut">Hair Cut</MenuItem>
                  <MenuItem value="Color">Color</MenuItem>
                  <MenuItem value="Style">Style</MenuItem>
                </Select>
              </div>
            </FormControl>
          </section>
          <section >
            <div className='input'>
              <TextField
                required
                id="email"
                label="Email"
                variant="filled"
                name="email"
                value={client.email}
                onChange={handleChange}
              />
            </div>
            <div className='input'>
              <TextField
                required
                id="phone"
                label="Phone Number"
                variant="filled"
                name="phone"
                value={client.phone}
                onChange={handleChange}
              />
            </div>
            <div className='input'>
              <TextField
                fullWidth
                id="clientNotes"
                multiline
                rows={4}
                label="Additional Notes"
                variant="filled"
                name="clientNotes"
                value={client.clientNotes}
                onChange={handleChange}
              />
            </div>
          </section>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div >
  );
};

export default ClientInfo;
