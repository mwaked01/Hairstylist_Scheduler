const sgMail = require('@sendgrid/mail')
require('dotenv').config({ path: './server/sendgrid.env' });

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Function to send an email
const sendConfirmationEmail = (appointment, client, clientByEmail) => {
    const msg = {
        to: 'marcelwaked@gmail.com', // Change to your recipient
        from: 'mwaked01@gmail.com', // Change to your verified sender
        subject: `Appointement Confirmation`,
        text: `Hello ${client.firstName} ${client.lastName},
        Please click the confirmation button for your ${appointment.service.name} appointment at ${appointment.time} on ${appointment.date}.`,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
};

module.exports = { sendConfirmationEmail };