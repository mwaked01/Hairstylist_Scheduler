const sgMail = require("@sendgrid/mail");
require("dotenv").config({ path: "./server/sendgrid.env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send an email
const sendConfirmationEmail = (appointment, client) => {
  const msg = {
    to: "marcelwaked@gmail.com",
    from: "mwaked01@gmail.com",
    subject: `Appointement Confirmation`,
    html: `
            Hello ${client.firstName} ${client.lastName}, 
            <br/>
            Please click the confirmation button for your ${appointment.service.name} appointment at ${appointment.time} on ${appointment.date}.
            <br/>
            <a href="http://localhost:8080/api/appointments/confirm/${appointment._id}" style="padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">
                Confirm Appointment
            </a>
    `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendConfirmationEmail };
