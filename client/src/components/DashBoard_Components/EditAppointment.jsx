import { useState, useEffect } from 'react';
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import '../../styles/StylistNotesButton.scss'

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';

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

const services = [
  ['Consultation', 30],  // 30 minutes for Consultation
  ['Cut - Bang Shaping', 30],  // 30 minutes for Hair Cut
  ['Cut - Women\'s', 60],  // 60 minutes for Hair Cut
  ['Cut - Men\'s', 30],  // 30 minutes for Hair Cut
  ['Cut - Child\'s (Under 10)', 30],  // 30 minutes for Hair Cut
  ['Color', 60],     // 60 minutes for Color
  ['Style', 45]      // 45 minutes for Style
];

const EditAppointment = (props) => {
  const {
    appointment,
    setAppointments,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [newInfo, setNewInfo] = useState(appointment);
  const [slots, setSlots] = useState(generateTimeSlots());

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    setSlots(generateTimeSlots())
    // console.log(generateTimeSlots())
    fetchAppointments();
  }, [newInfo]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/appointments/${newInfo.date}`);
      const appointments = response.data;
      // Extract time part from each appointment's date
      const takenTimes = appointments.map(appointment => {
        const time = appointment.time;
        return time;
      });
      // Filter out taken times from slots
      const filteredSlots = slots.filter(slot => !takenTimes.includes(slot) || slot === newInfo.time);
      setSlots(filteredSlots);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log (e.target)
    setNewInfo(prevClient => ({
      ...prevClient,
      [name]: value
    }));
  };

  const updateAppointment = (id, newNotes) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === id
          ? { ...appointment, stylistNotes: newNotes }
          : appointment
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${VITE_BACKEND_URL}/api/appointments/${appointment._id}`, {
        stylistNotes
      });
      if (response.status === 200) {
        // Update the appointment's stylistNotes in the parent component
        updateAppointment(appointment._id, stylistNotes);
        setOpenModal(false);
      } else {
        console.error('Error updating stylist notes');
      }
    } catch (error) {
      console.error('Error updating stylist notes:', error);
    }
  };

  const handleCancel = () => {
    setNewInfo(appointment)
    setOpenModal(false)
  }

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
                  // id="date"
                  type='date'
                  label="Date"
                  variant="filled"
                  name="date"
                  value={newInfo.date}
                  onChange={handleChange}
                />
              </div>
              <FormControl variant="filled" required>
                <div className='input'>
                  <InputLabel
                    id="time-label">Time</InputLabel>
                  <Select
                    fullWidth
                    labelId="time-label"
                    id="time"
                    name="time"
                    value={newInfo.time}
                    onChange={handleChange}
                  >
                    {slots.map((slot) =>
                      <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                    )}
                  </Select>
                </div>
              </FormControl>

              <FormControl variant="filled" required>
                <div className='input'>
                  <InputLabel id="service-label">Service Type</InputLabel>
                  <Select
                    fullWidth
                    labelId="service-label"
                    id="service"
                    name="service"
                    value={{['name']:newInfo.service.name}} // Assuming newInfo holds the selected service
                    onChange={handleChange} // Handle change to update the service
                  >
                    {services.map(([name, duration]) => (
                      <MenuItem key={name} value={name}>
                        {name} ({duration} mins)
                      </MenuItem>
                    ))}
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
                  value={newInfo.status}
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
                  value={newInfo.stylistNotes}
                  onChange={handleChange}
                />
              </div>

            </section>
            <section className='modal-btns'>
              <Button onClick={handleCancel} variant="contained" color="error">Cancel </Button>
              <Button type="submit" variant="contained" color="primary"> Submit</Button>
            </section>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditAppointment;