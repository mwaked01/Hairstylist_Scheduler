const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      // required: true,
    },
    clientNotes: {
      type: String,
      default: "",
    },
    stylistNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
