const express = require("express");
const router = express.Router();
const Client = require("../models/client");
const Appointment = require("../models/appointment");

// Route to get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().populate("appointments");
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving clients", error });
  }
});

// Route to search clients by name, email, or phone number
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const clients = await Client.find({
      $or: [
        { firstName: { $regex: `^${query}$`, $options: "i" } },
        { lastName: { $regex: `^${query}$`, $options: "i" } },
        { email: { $regex: `^${query}$`, $options: "i" } },
        { phone: { $regex: `^${query}$`, $options: "i" } },
      ],
    }).populate("appointments");
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error searching clients", error });
  }
});



// Route to add a new client
router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    appointment,
  } = req.body;

  try {
    const newAppointment = new Appointment({
      date: appointment.date,
      time: appointment.time,
      service: appointment.service,
      status: appointment.status,
      clientNotes: appointment.clientNotes,
    });

    await newAppointment.save();

    const newClient = new Client({
      firstName,
      lastName,
      email,
      phone,
      appointments: [newAppointment._id],
    });
    newAppointment.client = newClient._id
    await newAppointment.save();
    await newClient.save();
    res.status(201).json({ client: newClient, appointment: newAppointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating client or appointment", error });
  }
});

// Route to search clients by email and phone number
router.get("/searchByEmail", async (req, res) => {
  const { email } = req.query;
  try {
    const client = await Client.findOne({
      email: { $eq: email.toLowerCase() }
    });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error searching emails", error });
  }
});

// Route to add a new appointment to an existing client
router.post("/addAppointment/:client_id", async (req, res) => {

  // console.log('Request Body:', req.body.appointment); // Check if the body contains the appointment details

  const { client_id } = req.params;
  const {
    date,
    time,
    service,
    status,
    clientNotes
  } = req.body.appointment;

  try {
    const newAppointment = new Appointment({
      date,
      time,
      service,
      status,
      clientNotes,
      client: client_id
    });

    await newAppointment.save();

    const client = await Client.findById(client_id);
    client.appointments.push(newAppointment._id);
    await client.save();

    res.status(201).json({ client, appointment: newAppointment });
  } catch (error) {
    console.error('Server error:', error);
    res
      .status(500)
      .json({ message: "Error creating appointment", error });
  }
});


module.exports = router;
