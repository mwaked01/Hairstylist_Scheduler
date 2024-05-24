const mongoose = require("mongoose");

const seedClients = [
  {
    _id: new mongoose.Types.ObjectId(),
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
    _id: new mongoose.Types.ObjectId(),
    firstName: "Jane",
    lastName: "Smith",
    phone: "555-555-5556",
    email: "jane.smith@example.com",
    appointments: [new mongoose.Types.ObjectId("6649a22a353d5e20ec2414f9")],
  },
];

module.exports = seedClients;
