// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [appointments, setAppointments] = useState([]);
    const [form, setForm] = useState({ clientName: '', date: '', service: '' });

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const response = await axios.get('http://localhost:3000/appointments');
                console.log('Fetched appointments:', response.data); // Debugging line
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments', error);
            }
        }
        fetchAppointments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/appointments/book', form);
            setAppointments((prevAppointments) => [...prevAppointments, response.data]);
        } catch (error) {
            console.error('Error booking appointment', error);
        }
    };

    return (
        <div>
            <h1>Book an Appointment</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="clientName"
                    placeholder="Your Name"
                    value={form.clientName}
                    onChange={handleChange}
                />
                <input
                    type="datetime-local"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="service"
                    placeholder="Service"
                    value={form.service}
                    onChange={handleChange}
                />
                <button type="submit">Book</button>
            </form>
            <h2>Appointments</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        {appointment.clientName} - {new Date(appointment.date).toLocaleString()} - {appointment.service} - {appointment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
