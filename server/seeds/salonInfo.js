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
    services: [
      {
        name: "Consultation",
        cost: 0,
        duration: 30,
      },
      {
        name: "Cut - Bang Shaping",
        cost: 30,
        duration: 30,
      },
      {
        name: "Cut - Women's",
        cost: 75,
        duration: 60,
      },
      {
        name: "Cut - Men's",
        cost: 30,
        duration: 30,
      },
      {
        name: "Cut - Child's (Under 10)",
        cost: 25,
        duration: 30,
      },
      {
        name: "Color",
        cost: 120,
        duration: 60,
      },
      {
        name: "Style",
        cost: 80,
        duration: 45,
      },
      {
        name: "Bridal",
        cost: 60,
        duration: 90,
      },
    ],
  },
];

module.exports = seedSalonInfo;
