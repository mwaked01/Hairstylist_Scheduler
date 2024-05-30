const mongoose = require("mongoose");

const seedClients = [
  {
    _id: "6656b532de3c39f2712d0ba3",
    firstName: "John",
    lastName: "Doe",
    phone: "555-555-5555",
    email: "john.doe@example.com",
    appointments: [
      new mongoose.Types.ObjectId("6649a22a353d5e20ec2414f7"),
      new mongoose.Types.ObjectId("6649a22a353d5e20ec2414f8"),
    ],
  },
  {
    _id: "6656b532de3c39f2712d0ba4",
    firstName: "Jane",
    lastName: "Smith",
    phone: "555-555-5556",
    email: "jane.smith@example.com",
    appointments: [new mongoose.Types.ObjectId("6649a22a353d5e20ec2414f9")],
  },
];

module.exports = seedClients;
