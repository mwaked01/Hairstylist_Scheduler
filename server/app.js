const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const appointmentRoutes = require('./routes/appointments');
const clientsRoute = require('./routes/clients');



const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Database connection
mongoose.connect('mongodb://localhost:27017/brookes_scheduler', {})
.then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('Error connecting to MongoDB',  error.message);
  process.exit(1); // Exit the process if connection fails
});

// Use routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clients', clientsRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
