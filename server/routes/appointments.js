const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");

// Route to get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("client");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointments", error });
  }
});

// Route to get all appointments on a specific day
router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await Appointment.find({ date }).populate("client");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointments", error });
  }
});

// Route to update stylist notes for an appointment
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { stylistNotes } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { stylistNotes },
      { new: true }
    );
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating stylist notes", error });
  }
});

router.get("/confirm/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    appointment.status = "booked";
    await appointment.save();

    res.redirect(
      `${process.env.FRONTEND_URL}/AppointmentConfirmation?appointmentId=${appointment._id}`
    );
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).send("Error confirming appointment");
  }
});

// Route to get all appointments on a specific appointment id
router.get("/AppointmentConfirmation/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findById(appointmentId).populate(
      "client"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment Not Found" });
    }

    const appointmentDetails = {
      serviceName: appointment.service.name,
      date: appointment.date,
      time: appointment.time,
      clientEmail: appointment.client.email
    };

    res.status(200).json(appointmentDetails);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointments", error });
  }
});

module.exports = router;
