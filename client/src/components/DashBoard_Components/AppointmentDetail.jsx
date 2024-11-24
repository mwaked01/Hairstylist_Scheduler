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
  const { appointment, setAppointmentSelected, services, setSortBy } = props;
  const [slots, setSlots] = useState(generateTimeSlots());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [changedAppointment, setChangedAppointment] = useState(appointment);
  const fullTimeTable = generateTimeSlots();

  const handleOpenCalendar = () => setOpenCalendar(true);

  const handleCloseCalendar = () => setOpenCalendar(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setChangedAppointment((prevChangedAppointment) => ({
      ...prevChangedAppointment,
      [name]: value
    }));
  }

  const handleServiceChange = (event) => {
    const { value } = event.target;
    const valueDuration = services.find(service => service.name === value);
    setChangedAppointment((prevChangedAppointment) => ({
      ...prevChangedAppointment,
      service: { 'name': value, 'duration': valueDuration.duration },
    }));
  };

  const handleDateChange = (newDate) => {
    const appointmentDate = dayjs(newDate).format('YYYY-MM-DD');
    setChangedAppointment((prevChangedAppointment) => ({
      ...prevChangedAppointment,
      date: appointmentDate
    }));
  };

  useEffect(() => {
    fetchAppointments();
  }, [appointment.date]);

  useEffect(() => {
    appointment.service.name === changedAppointment.service.name &&
      appointment.status === changedAppointment.status &&
      appointment.date === changedAppointment.date &&
      appointment.time === changedAppointment.time &&
      appointment.stylistNotes === changedAppointment.stylistNotes ?
      setDisableSubmit(true) :
      setDisableSubmit(false);
  }, [changedAppointment])

  const fetchAppointments = async () => {
    const appointmentDate = {
      year: dayjs(changedAppointment.date).$y,
      month: dayjs(changedAppointment.date).$M < 9 ? `0${dayjs(changedAppointment.date).$M + 1}` : `${dayjs(changedAppointment.date).$M + 1}`,
      day: dayjs(changedAppointment.date).$D < 10 ? `0${dayjs(changedAppointment.date).$D}` : `${dayjs(changedAppointment.date).$D}`
    }
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/appointments/${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`);
      const appointments = response.data;
      const takenTimes = appointments.flatMap(appt => {
        if (appt._id === appointment._id || appt.status === "changed") return [];
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

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.put(
        `${VITE_BACKEND_URL}/api/appointments/change/${appointment._id}`,
        { changedAppointment }
      );

      if (response.status === 200) {
        const { newAppointment } = response.data;
        console.log("New appointment created:", newAppointment);
        setAppointmentSelected("");
        setSortBy("Calendar");
      } else {
        console.error("Error updating appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancel = () => {
    setAppointmentSelected("")
    setDisableSubmit(true)
    setSortBy("Calendar")
  }

  return (
    <form onSubmit={handleSubmit} id='apt-detail'>
      <div id='client-info'>
        <div id='client-name'>
          {`${appointment.client.firstName} ${appointment.client.lastName}`}
        </div>
        {appointment.client.phone}
        <br />
        {appointment.client.email}
      </div>
        {appointment.oldAppointment &&
          <div>
            This appointment was changed
          </div>
        }
      <div id='service-info'>
        <FormControl variant="filled" required id="service-status">
          <InputLabel id="service-label">Status</InputLabel>
          <Select
            fullWidth
            labelId="service-label"
            id="status"
            name="status"
            value={changedAppointment.status}
            onChange={handleChange}
          >
            <MenuItem key={"booked"} value={"booked"}>
              Booked
            </MenuItem>
            <MenuItem key={"completed"} value={"completed"}>
              Completed
            </MenuItem>
            <MenuItem key={"cancelled"} value={"cancelled"}>
              Cancelled
            </MenuItem>
            <MenuItem key={"pending"} value={"pending"}>
              Pending
            </MenuItem>
            <MenuItem key={"changed"} value={"changed"}>
              Changed
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" required>
          <InputLabel id="service-label">Service</InputLabel>
          <Select
            fullWidth
            labelId="service-label"
            id="service"
            name="service"
            value={changedAppointment.service.name}
            onChange={handleServiceChange}
          >
            {services.map((service) => (
              <MenuItem key={service.name} value={service.name}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div id='service-time'>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <Button
            endIcon={<CalendarMonthIcon />}
            onClick={handleOpenCalendar}
          >
            {new Date(dayjs(changedAppointment.date)).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}
          </Button>
          <DatePicker
            name='date'
            open={openCalendar}
            onClose={handleCloseCalendar}
            value={dayjs(changedAppointment.date)}
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

        <FormControl variant="filled" required id="service-time-picker">
          <div className='input'>
            <InputLabel
              id="time-label">Time</InputLabel>
            <Select
              fullWidth
              labelId="time-label"
              id="time"
              name="time"
              value={changedAppointment.time}
              onChange={handleChange}
            >
              {slots.map((slot) =>
                <MenuItem key={slot} value={slot}>{slot}</MenuItem>
              )}
            </Select>
          </div>
        </FormControl>
      </div>

      {/* <div id='client-notes'>
        Client Notes: {appointment.clientNotes}
      </div> */}

      <div className='input' id='client-notes'>
        <TextField
          id="clientNotes"
          label="clientNotes"
          variant="filled"
          name="clientNotes"
          value={appointment.clientNotes}
          disabled
        />
      </div>
      
      <div className='input' id='stylist-notes'>
        <TextField
          id="stylistNotes"
          label="stylistNotes"
          variant="filled"
          name="stylistNotes"
          value={changedAppointment.stylistNotes}
          onChange={handleChange}
        />
      </div>

      <div>
        <Button onClick={handleCancel} variant="contained" color="error" >Cancel</Button>
        <Button type="submit" variant="contained" color="primary" disabled={disableSubmit}> Submit</Button>
      </div>

    </form>
  );
};

export default AppointmentDetail;