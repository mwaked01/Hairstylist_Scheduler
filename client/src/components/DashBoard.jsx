import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays, subDays, startOfToday } from 'date-fns';

const DashBoard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState(format(currentDate, 'yyyy-MM-dd'));

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
    setSearchDate(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/clients/search?query=${searchQuery}`);
      setAppointments(Array.isArray(response.data[0].appointments)? response.data[0].appointments : [])
    } catch (error) {
      console.error('Error searching clients:', error);
    }
  };

  const handleDateSearch = () => {
    const date = new Date(searchDate);
    setCurrentDate(addDays(date, 1));
  };

  const navigateToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const navigateToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
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
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <input
          type="date"
          value={searchDate}
          onChange={handleDateChange}
        />
        <button onClick={handleDateSearch}>Search by Date</button>
      </div>
      <div>
        <button onClick={navigateToPreviousDay}>Previous Day</button>
        <h2>
          {format(currentDate, 'yyyy-MM-dd')}
        </h2>
        <button onClick={navigateToNextDay}>Next Day</button>
      </div>
      <div>
        {appointments.length > 0 ? (
          appointments.sort((a, b) => new Date(a.date) - new Date(b.date)).map((appointment) => (
            <div key={appointment._id}>
              <p>Time: {appointment.time}</p>
              <p>Client: {appointment.client.firstName} {appointment.client.lastName}</p>
              <p>Service: {appointment.service}</p>
              <p>Status: {appointment.status}</p>
              <p>Client Notes: {appointment.clientNotes}</p>
              <p>Stylist Notes: {appointment.stylisttNotes}</p>

            </div>
          ))
        ) : (
          <p>No appointments for this date.</p>
        )}
      </div>
    </section>
  );
};

export default DashBoard;