const mongoose = require("mongoose");

const seedAppointments = [
  {
    _id: "6649a22a353d5e20ec2414f7",
    date: "2024-10-26",
    time: "08:15 AM",
    "service": {
      "name": "Consultation",
      "duration": 30
    },
    status: "completed",
    clientNotes: "I want red hair",
    stylistNotes: "First appointment",
    client: [new mongoose.Types.ObjectId("6656b532de3c39f2712d0ba3")],

  },
  {
    _id: "6649a22a353d5e20ec2414f8",
    date: "2024-10-26",
    time: "11:00 AM",
    "service": {
      "name": "Cut - Men's",
      "duration": 60
    },
    status: "booked",
    clientNotes: "I want clean shave",
    stylistNotes: "second appointment",
    client: [new mongoose.Types.ObjectId("6656b532de3c39f2712d0ba3")],

  },
  {
    _id: "6649a22a353d5e20ec2414f9",
    date: "2024-10-26",
    time: "01:15 PM",
    "service": {
      "name": "Cut - Children's (Under 10)",
      "duration": 30
    },
    status: "pending",
    clientNotes: "I want short hair",
    stylistNotes: "First appointment",
    client: [new mongoose.Types.ObjectId("6656b532de3c39f2712d0ba4")],

  },
];

module.exports = seedAppointments;
