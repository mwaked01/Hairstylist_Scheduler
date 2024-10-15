import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';

const ClientSearch = (props) => {
  const {
    setFormSection,
    appointmentDate,
    client,
    setClient,
    sendConfirmationEmail
  } = props;

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleClientSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchError('Search can not be empty')
    } else {
      try {
        const appointment = {
          date: `${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`,
          time: appointmentDate.time,
          service: client.service,
          status: "pending",
          clientNotes: client.clientNotes
        };

        const response = await axios.get(`http://localhost:8080/api/clients/searchByEmail?email=${searchQuery}`);

        if (response.data) {
          const client_id = response.data._id;
          const newAppt = await axios.post(`http://localhost:8080/api/clients/addAppointment/${client_id}`, { appointment });
          console.log('Appointment information submitted:', newAppt.data.client);
          sendConfirmationEmail(appointment, client, newAppt.data.client, navigate)
          setSearchError("")
        } else {
          setFormSection('ClientForm')
          setClient(prevClient => ({
            ...prevClient,
            ['email']: searchQuery
          }));
          setSearchError("")
        }
      } catch (error) {
        console.error('Error searching clients:', error);
      }
    }
  };

  return (
    <form id='returning-client-search-bar'>
      <TextField
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter your Email Address"
        variant="outlined"
        placeholder="Search..."
        size="small"
        fullWidth
      />
      <IconButton onClick={handleClientSearch} type="button" aria-label=" search">
        <PersonSearchOutlinedIcon />
      </IconButton>
    </form>
  );
};

export default ClientSearch;