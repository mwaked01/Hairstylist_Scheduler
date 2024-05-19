const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointments');

const app = express();

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/appointments', {})
.then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('Error connecting to MongoDB',  error.message);
  process.exit(1); // Exit the process if connection fails
});

// Use routes
app.use('/appointments', appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
