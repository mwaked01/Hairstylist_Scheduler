const mongoose = require("mongoose");
const Client = require("../models/client");

mongoose
  .connect("mongodb://localhost:27017/brookes_scheduler", {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error.message);
    process.exit(1); // Exit the process if connection fails
  });

const seedClients = [
  {
    name: "John Doe",
    phone: "555-555-5555",
    email: "john.doe@example.com",
    appointments: [
      {
        date: new Date(),
        service: "Haircut",
        status: "booked",
        notes: "First appointment",
      },
      {
        date: new Date(),
        service: "Shave",
        status: "completed",
        notes: "Second appointment",
      },
    ],
  },
  {
    name: "Jane Smith",
    phone: "555-555-5556",
    email: "jane.smith@example.com",
    appointments: [
      {
        date: new Date(),
        service: "Haircut",
        status: "booked",
        notes: "First appointment",
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await Client.deleteMany(); // Clear existing clients
    await Client.insertMany(seedClients); // Insert the new seed data
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database", error.message);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

seedDatabase();
