import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';

const ClientSearch = (props) => {
  const {
    setFormSection,
    appointmentDate,
    client,
    setClient,
    appointmentSubmitMessage
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

        const response = await axios.get(`${VITE_BACKEND_URL}/api/clients/searchByEmail?email=${searchQuery}`);
        if (response.data) {
          console.log(appointment)
          const client_id = response.data._id;
          await axios.post(`${VITE_BACKEND_URL}/api/clients/addAppointment/${client_id}`, { appointment });
          appointmentSubmitMessage(navigate, searchQuery, appointment, "Submit")
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleClientSearch();
  };

  return (
    <form id='returning-client-search-bar' onSubmit={handleFormSubmit}>
      <TextField
        onChange={(e) => {
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