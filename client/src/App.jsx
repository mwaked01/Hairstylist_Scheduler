import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Booking from './components/booking';
import ClientList from './components/ClientList'
import BookingForm from './components/BookingForm';

import "./App.css"

function App() {

    return (
        <Router>
        <div>
          <NavBar />
          <Routes>
            {/* <Route path="/Booking" element={<Booking />} /> */}
            <Route path="/Booking" element={<BookingForm />} />

            <Route path="/ClientList" element={<ClientList />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
