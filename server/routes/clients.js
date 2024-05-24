const express = require("express");
const router = express.Router();
const Client = require("../models/client");

// Route to get all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().populate('appointments');
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving clients', error });
    }
});

// Route to book an appointment
router.post("/book", async (req, res) => {
  const { clientName, date, service } = req.body;
  const newAppointment = { date, service, status: "booked" };
  try {
    // Find if the client already exists
    let client = await Client.findOne({ clientName });

    if (client) {
      // Add the new appointment to the existing client
      client.appointments.push(newAppointment);
    } else {
      // Create a new client with the appointment
      console.log(clientName);
    }
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
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
