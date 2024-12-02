const mongoose = require("mongoose");

// Helper function to format dates
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Get today's date and tomorrow's date
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const seedAppointments = [
  {
    _id: "6649a22a353d5e20ec2414f7",
    date: formatDate(today), // Current date
    time: "08:15 AM",
    service: {
      name: "Consultation",
      duration: 30,
    },
    status: "completed",
    clientNotes: "I want red hair",
    stylistNotes: "First appointment",
    client: [new mongoose.Types.ObjectId("6656b532de3c39f2712d0ba3")],
  },
  {
    _id: "6649a22a353d5e20ec2414f8",
    date: formatDate(tomorrow), // Tomorrow's date
    time: "11:00 AM",
    service: {
      name: "Cut - Men's",
      duration: 60,
    },
    status: "booked",
    clientNotes: "I want clean shave",
    stylistNotes: "Second appointment",
    client: [new mongoose.Types.ObjectId("6656b532de3c39f2712d0ba3")],
  },
  {
    _id: "6649a22a353d5e20ec2414f9",
    date: formatDate(tomorrow), // Tomorrow's date
    time: "01:15 PM",
    service: {
      name: "Cut - Children's (Under 10)",
      duration: 30,
    },
    status: "pending",
    clientNotes: "I want short hair",
    stylistNotes: "First appointment",
    client: [new mongoose.Types.ObjectId("6656b532de3c39f2712d0ba4")],
  },
];

module.exports = seedAppointments;
