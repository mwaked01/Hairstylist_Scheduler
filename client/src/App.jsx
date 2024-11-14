import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import NavBar from './components/NavBar';
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import Booking from './components/Booking';
import AppointmentConfirmation from './components/AppointmentConfirmation';

import "./App.css"

function App() {
  const [shopInfo, setShopInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalonInfo();
  }, []);

  const fetchSalonInfo = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/salonInfo`);
      setShopInfo(response.data[0]);
    } catch (error) {
      console.error('Error fetching clients info', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home shopInfo={shopInfo} loading={loading} />} />
          <Route path="/Booking" element={<Booking shopInfo={shopInfo} loading={loading} />} />
          <Route path="/Dashboard" element={<DashBoard shopInfo={shopInfo} loading={loading} />} />
          <Route path="/AppointmentConfirmation" element={<AppointmentConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
