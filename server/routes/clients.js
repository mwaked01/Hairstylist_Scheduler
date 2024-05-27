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

// Route to add a new client
router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    service,
    clientNotes,
    appointment,
  } = req.body;
  try {
    const newAppointment = new Appointment({
      date: appointment.date,
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

    await newClient.save();
    res.status(201).json({ client: newClient, appointment: newAppointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating client or appointment", error });
  }
});

// // Route to update an appointment
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { clientName, date, service, status } = req.body;
//     try {
//         const updatedAppointment = await Appointment.findByIdAndUpdate(
//             id,
//             { clientName, date, service, status },
//             { new: true }
//         );
//         if (!updatedAppointment) {
//             return res.status(404).json({ message: 'Appointment not found' });
//         }
//         res.status(200).json(updatedAppointment);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating appointment', error });
//     }
// });

// // Route to delete an appointment
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedAppointment = await Appointment.findByIdAndDelete(id);
//         if (!deletedAppointment) {
//             return res.status(404).json({ message: 'Appointment not found' });
//         }
//         res.status(200).json({ message: 'Appointment deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting appointment', error });
//     }
// });

module.exports = router;
