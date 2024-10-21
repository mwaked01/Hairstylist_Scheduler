const mongoose = require("mongoose");
const SalonInfo = require("../models/salonInfo");
const Client = require("../models/client");
const Appointment = require("../models/appointment"); // Adjusted import
const seedAppointments = require("./appointments");
const seedClients = require("./clients")
const seedSalonInfo = require('./salonInfo');
// Database connection
mongoose
  .connect("mongodb://localhost:27017/brookes_scheduler", {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });


const seedDatabase = async () => {
  try {
    await SalonInfo.deleteMany(); // Clear existing salonInfo
    await Client.deleteMany(); // Clear existing clients
    await Appointment.deleteMany(); // Clear existing appointments
    await Appointment.insertMany(seedAppointments); // Insert the new appointments
    await Client.insertMany(seedClients); // Insert the new clients
    await SalonInfo.insertMany(seedSalonInfo); // Insert the new clients
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

seedDatabase();