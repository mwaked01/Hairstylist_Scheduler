import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import NavBar from './components/NavBar';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import DashBoard from './components/DashBoard';
import Booking from './components/Booking';

import "./App.css"

function App() {
  const [shopInfo, setShopInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalonInfo();
  }, []);

  const fetchSalonInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/salonInfo');
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
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
