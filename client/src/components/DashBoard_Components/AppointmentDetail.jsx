import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { generateTimeSlots, addMinutesToTime } from '../../utils/helpers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AppointmentDetail = (props) => {
  const { appointment, setAppointmentSelected, services } = props;
  const [slots, setSlots] = useState(generateTimeSlots());
  const [openCalendar, setOpenCalendar] = useState(false);
  const fullTimeTable = generateTimeSlots();

  const handleOpenCalendar = () => setOpenCalendar(true);

  const handleCloseCalendar = () => setOpenCalendar(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointmentSelected((prevAppointmentSelected) => ({
      ...prevAppointmentSelected,
      [name]: value
    }));
  }

  const handleServiceChange = (event) => {
    const { value } = event.target;
    const valueDuration = services.find(service => service.name === value);
    setAppointmentSelected((prevAppointmentSelected) => ({
      ...prevAppointmentSelected,
      service: { 'name': value, 'duration': valueDuration.duration },
    }));
  };

  const handleDateChange = (newDate) => {
    const appointmentDate = dayjs(newDate).format('YYYY-MM-DD');

    console.log(appointment.date)
    console.log(appointmentDate)
    setAppointmentSelected((prevAppointmentSelected) => ({
      ...prevAppointmentSelected,
      date: appointmentDate
    }));
  };

  useEffect(() => {
    fetchAppointments();
  }, [appointment.date]);

  const fetchAppointments = async () => {
    const appointmentDate = {
      year: dayjs(appointment.date).$y,
      month: dayjs(appointment.date).$M < 9 ? `0${dayjs(appointment.date).$M + 1}` : `${dayjs(appointment.date).$M + 1}`,
      day: dayjs(appointment.date).$D < 10 ? `0${dayjs(appointment.date).$D}` : `${dayjs(appointment.date).$D}`
    }
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/appointments/${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`);
      const appointments = response.data;
      const takenTimes = appointments.flatMap(appt => {
        if (appt._id === appointment._id) return [];
        const startTime = appt.time;
        const appointmentDuration = appt.service.duration / 15; // Number of 15-minute slots
        const times = [];
        for (let i = 0; i <= appointmentDuration; i++) {
          const timeSlot = addMinutesToTime(startTime, i * 15);
          times.push(timeSlot);
        }
        return times;
      });
      // Number of slots the selected service requires
      const requiredSlots = appointment.service.duration / 15 + 1;
      // Filter out taken times and slots that can't accommodate the service duration
      const filteredSlots = fullTimeTable.filter((slot, index) => {
        // Check if slot is already taken
        if (takenTimes.includes(slot)) {
          return false;
        }
        // Check if there are enough consecutive available slots
        for (let i = 0; i < requiredSlots; i++) {
          const nextSlot = fullTimeTable[index + i];
          if (!nextSlot || takenTimes.includes(nextSlot)) {
            return false; // Not enough consecutive slots or next slot is taken
          }
        }
        return true; // Slot is available and has enough consecutive free slots
      });
      setSlots(filteredSlots);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <form>
      <div>
        {`${appointment.client.firstName} ${appointment.client.lastName}`}
      </div>

      <div>
        Phone #: {appointment.client.phone}
      </div>

      <div>
        Email: {appointment.client.email}
      </div>

      <FormControl variant="filled" required>
        <div className="input">
          <InputLabel id="service-label">Service</InputLabel>
          <Select
            fullWidth
            labelId="service-label"
            id="service"
            name="service"
            value={appointment.service.name}
            onChange={handleServiceChange}
          >
            {services.map((service) => (
              <MenuItem key={service.name} value={service.name}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Button
          endIcon={<CalendarMonthIcon />}
          onClick={handleOpenCalendar}
        >
          {appointment.date}
        </Button>
        <DatePicker
          name='date'
          open={openCalendar}
          onClose={handleCloseCalendar}
          value={dayjs(appointment.date)}
          onChange={handleDateChange}
          disablePast={false}
          slotProps={{
            textField: {
              sx: {
                opacity: 0,
                width: 0,
                height: 0,
                padding: 0,
              },
            },
          }}
        />
      </LocalizationProvider>

      <FormControl variant="filled" required>
        <div className='input'>
          <InputLabel
            id="time-label">Time</InputLabel>
          <Select
            fullWidth
            labelId="time-label"
            id="time"
            name="time"
            value={appointment.time}
            onChange={handleChange}
          >
            {slots.map((slot) =>
              <MenuItem key={slot} value={slot}>{slot}</MenuItem>
            )}
          </Select>
        </div>
      </FormControl>

      <div>
        Client Notes: {appointment.clientNotes}
      </div>

      <div>
        Stylist Notes: {appointment.stylistNotes}
      </div>

    </form>
  );
};

export default AppointmentDetail;