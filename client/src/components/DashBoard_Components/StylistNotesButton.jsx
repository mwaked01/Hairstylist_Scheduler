import { useState } from 'react';
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import '../../styles/StylistNotesButton.scss'

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';

const StylistNotesButton = (props) => {
  const {
    appointment,
    updateAppointmentNotes
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
      const response = await axios.put(`${VITE_BACKEND_URL}/api/appointments/${appointment._id}`, {
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
        <AddCommentRoundedIcon
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
            <TextField
              fullWidth
              multiline
              rows={10}
              label="Add Notes"
              variant="filled"
              name="stylistNotes"
              value={stylistNotes}
              onChange={handleChange}
            />
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

export default StylistNotesButton;