import { useState, useEffect } from 'react';
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import AppointmentsByClientList from './DashBoard_Components/AppointmentsByClientList';
import ClientList from './DashBoard_Components/ClientList';
import AppointmentsCalendar from './DashBoard_Components/AppointmentsCalendar';
import AppointmentDetail from './DashBoard_Components/AppointmentDetail';

import '../styles/DashBoard.scss'
import { Divider, Skeleton } from '@mui/material';

const DashBoard = (props) => {
  const { shopInfo, loading } = props
  const [sortBY, setSortBy] = useState('Calendar')
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [appointmentSelected, setAppointmentSelected] = useState("");
  const [clients, setClients] = useState([]);
  const [clientSelected, setClientSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    fetchAppointments(currentDate);
  }, [currentDate]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients info', error);
    }
  }
  const fetchAppointments = async (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/appointments/${year}-${month}-${day}`);
      setAppointments(Array.isArray(response.data) ? response.data : []);
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    }
  };

  const handleDateChange = (e) => {
    setCurrentDate(new Date(e));
    setSortBy('Calendar')
  };

  const handleClientSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchError('Search can not be empty')
    } else {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/api/clients/search?query=${searchQuery}`);
        if (response.data.length > 0) {
          setClients(Array.isArray(response.data) ? response.data : [])
          setSearchError("")
        } else {
          setClients([])
          setSearchError("")
          // setSearchError('No clients found');
        }
      } catch (error) {
        console.error('Error searching clients:', error);
      }
    }
  };

  const handleClientListButton = () => {
    fetchClients();
    setSortBy('ClientList');
    setSearchError('')
  }

  return (
    <section id='dashboard'>
      {sortBY === 'Calendar' ?
        <AppointmentsCalendar
          appointments={appointments}
          setAppointments={setAppointments}
          client={clientSelected}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          handleDateChange={handleDateChange}
          setSortBy={setSortBy}
          sortBY={sortBY}
          handleClientListButton={handleClientListButton}
          setAppointmentSelected={setAppointmentSelected}
        /> : sortBY === 'ClientList' ?
          <ClientList
            clients={clients}
            setSortBy={setSortBy}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleClientSearch={handleClientSearch}
            setClientSelected={setClientSelected}
            setAppointments={setAppointments}
            setCurrentDate={setCurrentDate}
            searchError={searchError}
            handleClientListButton={handleClientListButton}
            setSearchError={setSearchError}
          /> : sortBY === 'Client' ?
            <AppointmentsByClientList
              appointments={appointments}
              client={clientSelected}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleClientSearch={handleClientSearch}
              setCurrentDate={setCurrentDate}
              sortBY={sortBY}
              handleClientListButton={handleClientListButton}
              setSearchError={setSearchError}
              setAppointmentSelected={setAppointmentSelected}
            />
            : sortBY === 'Appointment' ?
              loading ?
                <div className="loading-skeleton" style={{ width: "90%" }}>
                  <Divider />
                  <Skeleton />
                  <Divider />
                  <Skeleton />
                  <Skeleton variant="rectangular" height="30vh" animation="wave" />
                </div>
                :
                <AppointmentDetail
                  appointment={appointmentSelected}
                  setAppointmentSelected={setAppointmentSelected}
                  services={shopInfo.services}
                  setSortBy={setSortBy}
                />
              : <p>Nothing to Show</p>
      }
    </section>
  );
};

export default DashBoard;