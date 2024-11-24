import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


import ClientSearch from './ClientSearch';

const ClientInfo = (props) => {
  const {
    client,
    setClient,
    handleSubmit,
    setFormSection,
    formSection,
    appointmentDate,
    service,
    appointmentSubmitMessage
  } = props;

  // Validation functions
  const validateName = (name) => /^[A-Za-z]+$/.test(name); // Letters only
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email format
  const validatePhone = (phone) => /^\d{10}$/.test(phone); // 10-digit phone number

  const [formErrors, setFormErrors] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (client.email && !validateEmail(client.email)) {
      setFormErrors({ email: "Please enter a valid email address." });
    } else {
      setFormErrors({});
    }
  }, [client.email]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the client state
    setClient(prevClient => ({
      ...prevClient,
      [name]: value
    }));

    // Validate the field based on input name
    let newErrors = { ...formErrors };
    if (name === "firstName" || name === "lastName") {
      if (!validateName(value)) {
        newErrors[name] = "Name should contain only letters.";
        setDisableSubmit(true)
      } else {
        delete newErrors[name];
        setDisableSubmit(false)
      }
    }

    if (name === "email") {
      if (!validateEmail(value)) {
        newErrors[name] = "Please enter a valid email address.";
        setDisableSubmit(true)
      } else {
        delete newErrors[name];
        setDisableSubmit(false)
      }
    }

    if (name === "phone") {
      if (!validatePhone(value)) {
        newErrors[name] = "Phone number should be 10 digits.";
        setDisableSubmit(true)
      } else {
        delete newErrors[name];
        setDisableSubmit(false)
      }
    }

    setFormErrors(newErrors);
  };

  return (
    <div id='client-info'>
      {formSection === 'ClientSearch' ?
        <div id='ClientSearch'>
          <header className='Booking-Nav'>
            <IconButton onClick={() => { setFormSection('Date'); setFormErrors({}) }} type="button" className='back-btn' aria-label="search">
              <ArrowBackIosNewIcon fontSize='small' />
              Date
            </IconButton>
            <div className='date' name='date'>{months[appointmentDate.month - 1]} {appointmentDate.day}, {appointmentDate.year} at {appointmentDate.time}</div>
          </header>
          <ClientSearch
            setFormSection={setFormSection}
            appointmentDate={appointmentDate}
            client={client}
            setClient={setClient}
            appointmentSubmitMessage={appointmentSubmitMessage}
          />
        </div>
        :

        <form onSubmit={handleSubmit} id='NewClient'>
          <header className='Booking-Nav'>
            <IconButton onClick={() => { setFormSection('ClientSearch') }} type="button" className='back-btn' aria-label="search">
              <ArrowBackIosNewIcon fontSize='small' />
              Email
            </IconButton>
            <div className='date' name='date'>{months[appointmentDate.month - 1]} {appointmentDate.day}, {appointmentDate.year} at {appointmentDate.time}</div>
          </header>

          <input type="hidden" name="date" value={`${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`} />
          <input type="hidden" name="time" value={appointmentDate.time} />
          <input type="hidden" name="service" value={service.name} />

          <div className='client-form-input'>
            <section id="form-name">
              <div className='input-left'>
                <TextField
                  required
                  id="first-name"
                  label="First Name"
                  variant="filled"
                  name="firstName"
                  value={client.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </div>
              <div className='input-right'>
                <TextField
                  required
                  id="last-name"
                  label="Last Name"
                  variant="filled"
                  name="lastName"
                  value={client.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </div>
            </section>

            <section id="form-contact">
              <div className='input-left'>
                <TextField
                  required
                  id="email"
                  label="Email"
                  type='email'
                  variant="filled"
                  name="email"
                  value={client.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </div>
              <div className='input-right'>
                <TextField
                  required
                  id="phone"
                  label="Phone Number"
                  variant="filled"
                  name="phone"
                  value={client.phone}
                  onChange={handleChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                />
              </div>
            </section>
          <div id='form-message'>
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
          </div>


          <Button type="submit" variant="contained" color="success" disabled={disableSubmit}>
            Submit
          </Button>
        </form>
      }
    </div >
  );
};

export default ClientInfo;
