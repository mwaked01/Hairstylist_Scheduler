// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [clients, setClients] = useState([]);
    const [form, setForm] = useState({ clientName: '', date: '', service: '' });

    //Read data from from server /clients
    useEffect(() => {
        async function fetchClients() {
            try {
                const response = await axios.get('http://localhost:3000/clients');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients info', error);
            }
        }
        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    //POST on server /appointemnts/book with new appointment
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
            <h2>Clients</h2>
            <ul>
                {clients.map((client) => (
                    <li key={client._id}>
                        {client.name} - {client.phone} - {client.email} -{client.appointments.length} 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
