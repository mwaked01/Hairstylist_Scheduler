const seedSalonInfo = [
  {
    name: "Hair By Brooke",
    operationHours: {
      Tuesday: { open: "09:00", close: "19:00" },
      Wednesday: { open: "09:00", close: "19:00" },
      Thursday: { open: "09:00", close: "19:00" },
      Friday: { open: "09:00", close: "19:00" },
      Saturday: { open: "08:00", close: "15:30" },
      Sunday: { open: null, close: null },
      Monday: { open: null, close: null },
    },
    phone: "226-555-5555",
    email: "brooke@example.com",
    location: {
      address: "5965 Wyandotte St E, Windsor, ON",
      lat: 42.3289945,
      lng: -82.9654805,
    },
  },
];

module.exports = seedSalonInfo;
