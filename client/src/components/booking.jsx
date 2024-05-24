import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "../styles/Booking.scss"

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 8; i <= 18; i++) {
    slots.push(`${i}:00`);
  }
  return slots;
};

const getWeeksInMonth = (year, month) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  return Math.ceil((daysInMonth + (firstDay === 0 ? 6 : firstDay - 1)) / 7); 
};

const generateDaysForWeek = (year, month, week) => {
  const daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjusted for Monday start
  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = week * 7 - adjustedFirstDay + 1;
  const days = [];

  for (let i = 0; i < 6; i++) { // Loop through Monday to Saturday
    let dayDate = startDay + i;
    let currentMonth = month;
    let currentYear = year;
    if (dayDate <= 0) {
      // Previous month
      const previousMonthDays = new Date(year, month - 1, 0).getDate();
      dayDate = previousMonthDays + dayDate;
      currentMonth = month - 1;
      if (currentMonth < 1) {
        currentMonth = 12;
        currentYear -= 1;
      }
    } else if (dayDate > daysInMonth) {
      // Next month
      dayDate = dayDate - daysInMonth;
      currentMonth = month + 1;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear += 1;
      }
    }

    const monthName = new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' });
    days.push({ label: <>{daysInWeek[i]}<br />{monthName} {dayDate}</>, date: new Date(currentYear, currentMonth - 1, dayDate) });
  }

  return days;
};


const Booking = (props) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState(generateTimeSlots());
  const [showForm, setShowForm] = useState(null);
  const [days, setDays] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    setDays(generateDaysForWeek(selectedYear, selectedMonth, currentWeek));
  }, [selectedYear, selectedMonth, currentWeek]);

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
    setCurrentWeek(0); // Reset to the first week of the new month
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
    setCurrentWeek(0); // Reset to the first week of the new year
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleAddClick = (slot) => {
    setShowForm(slot);
  };

  const handleBookingComplete = () => {
    setShowForm(null);
    // Refresh slots or fetch new data if needed
  };

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    } else {
      // Handle going to the previous month
      if (selectedMonth > 1) {
        setSelectedMonth(selectedMonth - 1);
        setCurrentWeek(getWeeksInMonth(selectedYear, selectedMonth - 1) - 1);
      } else {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(12);
        setCurrentWeek(getWeeksInMonth(selectedYear - 1, 12) - 1);
      }
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < getWeeksInMonth(selectedYear, selectedMonth) - 1) {
      setCurrentWeek(currentWeek + 1);
    } else {
      // Handle going to the next month
      if (selectedMonth < 12) {
        setSelectedMonth(selectedMonth + 1);
        setCurrentWeek(0);
      } else {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(1);
        setCurrentWeek(0);
      }
    }
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <header className='month-year'>
        <select id='month' value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
        <select id='year' value={selectedYear} onChange={handleYearChange}>
          {[currentYear, currentYear + 1].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </header>

      <section className='days-slots'>
        <div className='days'>
          <button onClick={handlePrevWeek}>&lt;</button>
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              style={{
                margin: '5px',
                padding:'0.5em',
                backgroundColor: selectedDay === day ? 'lightblue' : 'white'
              }}
            >
              {day.label}
            </button>
          ))}
          <button onClick={handleNextWeek}>&gt;</button>
        </div>

        <div className='slots'>
          {slots.map(slot => (
            <div key={slot} className='slot'>
              <div>{slot}</div>
              {showForm === slot ? (
                <BookingForm slot={slot} onBookingComplete={handleBookingComplete} />
              ) : (
                <button onClick={() => handleAddClick(slot)}>Add</button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Booking;
