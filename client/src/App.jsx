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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients info', error);
      setLoading(false);
    }
  }
  return (
    <Router>
      <div>
        <NavBar />
        {loading ?
          <div className="loading-icon">
            loading..
          </div>
          :
          <Routes>
            <Route path="/Booking" element={<Booking services={shopInfo.services} />} />
            {/* <Route path="/Booking" element={<BookingForm services={shopInfo.services} />} /> */}
            <Route path="/Dashboard" element={<DashBoard />} />
            <Route path="/" element={<Home shopInfo={shopInfo} />} />
            <Route path="/AppointmentConfirmation" element={<AppointmentConfirmation shopInfo={shopInfo} loading={loading} setLoading={setLoading} />} />
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
