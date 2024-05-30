const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// Route to get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('client');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving appointments', error });
  }
});

// Route to get all appointments on a specific day
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await Appointment.find({ date }).populate('client');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving appointments', error });
  }
});

module.exports = router;
