const express = require("express");
const router = express.Router();
const SalonInfo = require("../models/salonInfo");

// Route to get salonInfo
router.get("/", async (req, res) => {
  try {
    const salonInfo = await SalonInfo.find();
    res.status(200).json(salonInfo);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving salonInfo", error });
  }
});

module.exports = router;
