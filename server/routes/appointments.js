const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");

// Route to get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error retrieving appointments:", error.stack || error); // Log the full error stack
    res
      .status(500)
      .json({ message: "Error retrieving appointments", error: error.message });
  }
});

// Route to get all appointment dates
router.get("/dates", async (req, res) => {
  try {
    const appointments = await Appointment.find().select("date _id");
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error retrieving appointments:", error.stack || error); // Log the full error stack
    res
      .status(500)
      .json({ message: "Error retrieving appointments", error: error.message });
  }
});

// Route to book an appointment
router.post("/book", async (req, res) => {
  const { name, phone, email, date, service, notes } = req.body;
  const newAppointment = { date, service, status: "booked", notes };

  try {
    // Find if the client already exists
    let client = await Client.findOne({ email });

    if (client) {
      // Add the new appointment to the existing client
      client.appointments.push(newAppointment);
    } else {
      // Create a new client with the appointment
      client = new Client({
        name,
        phone,
        email,
        appointments: [newAppointment],
      });
    }

    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
});

// Route to update an appointment
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { clientName, date, service, status } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { clientName, date, service, status },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
});

// Route to delete an appointment
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
});

module.exports = router;
