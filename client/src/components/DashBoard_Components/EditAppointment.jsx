import { useState } from 'react';
import axios from 'axios';

import '../../styles/StylistNotesButton.scss'

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';

const EditAppointment = (props) => {
  const {
    appointment,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const [stylistNotes, setStylistNotes] = useState(appointment.stylistNotes || '');

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    setStylistNotes(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/appointments/${appointment._id}`, {
        stylistNotes
      });
      if (response.status === 200) {
        // Update the appointment's stylistNotes in the parent component
        updateAppointmentNotes(appointment._id, stylistNotes);
        setOpenModal(false);
      } else {
        console.error('Error updating stylist notes');
      }
    } catch (error) {
      console.error('Error updating stylist notes:', error);
    }
  };

  return (
    <div >
      <div className='add-btn'>
        <EditCalendarRoundedIcon
          onClick={handleOpenModal}
          sx={{ padding: '0.1em' }}
        />
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <div id='stylist-notes-modal'>
          <form onSubmit={handleSubmit} id="stylist-notes">
          <section >
            <div className='input'>
              <TextField
                required
                id="date"
                label="Date"
                variant="filled"
                name="date"
                value={appointment.date}
                onChange={handleChange}
              />
            </div>
            <div className='input'>
              <TextField
                required
                id="time"
                label="Time"
                variant="filled"
                name="time"
                value={appointment.time}
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
                  value={appointment.service}
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
                id="status"
                label="status"
                variant="filled"
                name="status"
                value={appointment.status}
                onChange={handleChange}
              />
            </div>
            <div className='input'>
              <TextField
                required
                id="stylistNotes"
                label="stylistNotes"
                variant="filled"
                name="stylistNotes"
                value={appointment.stylistNotes}
                onChange={handleChange}
              />
            </div>

          </section>
            <section className='modal-btns'>
              <Button onClick={handleCloseModal} variant="contained" color="error">Cancel </Button>
              <Button type="submit" variant="contained" color="primary"> Submit</Button>
            </section>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditAppointment;