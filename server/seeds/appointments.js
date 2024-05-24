const seedAppointments = [
  {
    _id: "6649a22a353d5e20ec2414f7",
    date: new Date(2024, 5, 23, 14, 15),
    service: "Haircut",
    status: "completed",
    clientNotes: "I want red hair",
    stylistNotes: "First appointment",
  },
  {
    _id: "6649a22a353d5e20ec2414f8",
    date: new Date(2024, 6, 2, 13, 30),
    service: "Shave",
    status: "booked",
    clientNotes: "I want clean shave",
    stylistNotes: "second appointment",
  },
  {
    _id: "6649a22a353d5e20ec2414f9",
    date: new Date(2024, 6, 10, 12, 0),
    service: "Haircut",
    status: "completed",
    clientNotes: "I want short hair",
    stylistNotes: "First appointment",
  },
];

module.exports = seedAppointments;
