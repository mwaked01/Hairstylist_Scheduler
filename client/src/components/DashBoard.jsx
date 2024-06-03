/*
To Do:
update client search to look up bu email and phone number
only on full search query match.

*/

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import AppointmentsByDateList from './DashBoard_Components/AppointmentsByDateList';
import AppointmentsByClientList from './DashBoard_Components/AppointmentsByClientList';

const DashBoard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [clientSelected, setClientSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState(format(currentDate, 'yyyy-MM-dd'));
  const [sortBY, setSortBy] = useState('Date')

  useEffect(() => {
    fetchAppointments(currentDate);
  }, [currentDate]);


  const fetchAppointments = async (date) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it is zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    try {
      const response = await axios.get(`http://localhost:8080/api/appointments/${year}-${month}-${day}`);
      setAppointments(Array.isArray(response.data) ? response.data : []);
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    }
  };

  const handleDateChange = (e) => {
    setSearchDate(format(new Date(e), 'yyyy-MM-dd'));
    setCurrentDate(new Date(e));
    setSortBy('Date')
  };

  const handleClientSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/clients/search?query=${searchQuery}`);
      setAppointments(Array.isArray(response.data[0].appointments) ? response.data[0].appointments : [])
      setClientSelected(response.data[0])
      setSortBy('Client')
    } catch (error) {
      console.error('Error searching clients:', error);
    }
  };

  return (
    <section>
      <div>
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleClientSearch}>Search</button>
      </div>

      {sortBY === 'Date' ?
        <AppointmentsByDateList
          appointments={appointments}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          searchDate={searchDate}
          handleDateChange={handleDateChange}
        /> : sortBY === 'Client' ?
          <AppointmentsByClientList
            appointments={appointments}
            client={clientSelected}
          /> : <p>Nothing to Show</p>
      }
    </section>
  );
};

export default DashBoard;