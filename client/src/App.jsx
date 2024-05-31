import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import DashBoard from './components/DashBoard';

import "./App.css"

function App() {

    return (
        <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/Booking" element={<BookingForm />} />

            <Route path="/Dashboard" element={<DashBoard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
