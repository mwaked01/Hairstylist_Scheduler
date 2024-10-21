const mongoose = require("mongoose");

const salonInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    operationHours: {
      type: Map,
      of: new mongoose.Schema({
        open: { type: String, default: null },
        close: { type: String, default: null },
      }),
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      address: { type: String, default: null },
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
  },
  {
    timestamps: true,
  }
);

const SalonInfo = mongoose.model("SalonInfo", salonInfoSchema);

module.exports = SalonInfo;
