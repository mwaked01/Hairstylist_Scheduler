import React, { useState } from 'react';
import '../../styles/ClientInfo.scss'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import NewClientButton from './NewClientButton';
import ReturningClientButton from './ReturningClientButton';

const ClientInfo = (props) => {
  const {
    client,
    setClient,
    handleSubmit,
    setFormSection,
    formSection,
    appointmentDate,
    service
  } = props;

  const [formErrors, setFormErrors] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Validation functions
  const validateName = (name) => /^[A-Za-z]+$/.test(name); // Letters only
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email format
  const validatePhone = (phone) => /^\d{10}$/.test(phone); // 10-digit phone number

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
      <header>
        <IconButton onClick={() => { setFormSection('Time') }} type="button" className='back-btn' aria-label="search">
          <ArrowBackIosNewIcon fontSize='small' />
          Time
        </IconButton>
        <h2 className='date' name='date'>{months[appointmentDate.month - 1]} {appointmentDate.day}, {appointmentDate.year} at {appointmentDate.time}</h2>
      </header>

      {formSection === 'ReturningClient' ?
        <div id='ReturningClient'>
          <NewClientButton setFormSection={setFormSection} />
          <form id='returning-client-search-bar'>
            <TextField
              // onInput={(e) => {
              //   setSearchQuery(e.target.value);
              // }}
              label="Enter an Email or a Phone Number..."
              variant="outlined"
              placeholder="Search..."
              size="small"
              fullWidth
            />
            <IconButton type="submit" aria-label=" search">
              <PersonSearchOutlinedIcon />
            </IconButton>
          </form>
        </div>
        :
        <form onSubmit={handleSubmit} id='NewClient'>
          <ReturningClientButton setFormSection={setFormSection} />

          <input type="hidden" name="date" value={`${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`} />
          <input type="hidden" name="time" value={appointmentDate.time} />
          <input type="hidden" name="service" value={service.name} />

          <div className='client-form-input'>
            <section>
              <div className='input'>
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
              <div className='input'>
                <TextField
                  required
                  id="email"
                  label="Email"
                  type='Email'
                  variant="filled"
                  name="email"
                  value={client.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </div>
            </section>

            <section>
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
          </div>

          <div className='input-right'>
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

          <Button type="submit" variant="contained" color="success" disabled={disableSubmit}>
            Submit
          </Button>
        </form>
      }
    </div >
  );
};

export default ClientInfo;
