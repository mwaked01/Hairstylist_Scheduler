const mongoose = require("mongoose");
const Client = require("../models/client");
const {Appointment} = require('../models/appointment');

mongoose
  .connect("mongodb://localhost:27017/brookes_scheduler", {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    process.exit(1); // Exit the process if connection fails
  });

const seedAppointments = require("./appointments");

const seedClients = [
  {
    name: "John Doe",
    phone: "555-555-5555",
    email: "john.doe@example.com",
    appointments: [
      seedAppointments[1],
      seedAppointments[1],
    ],
  },
  {
    name: "Jane Smith",
    phone: "555-555-5556",
    email: "jane.smith@example.com",
    appointments: [
      seedAppointments[2],
    ],
  },
];

const seedDatabase = async () => {
  try {
    await Client.deleteMany(); // Clear existing clients
    await Appointment.deleteMany(); // Clear existing appointments
    await Client.insertMany(seedClients); // Insert the new seed data
    await Appointment.insertMany(seedAppointments);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database", error.message);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

seedDatabase();
