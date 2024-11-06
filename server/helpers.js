const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send an email
const sendConfirmationEmail = (appointment, client) => {
  const msg = {
    to: "mwaked01@gmail.com",
    from: "marcelwaked@gmail.com",
    subject: `Appointement Confirmation`,
    html: `
      <div>
        Hello ${client.firstName} ${client.lastName}, 
        <br/>
        <br/>
        Please click the confirmation button to verify you appointment:
        <br/>
        Service: ${appointment.service.name} 
        <br/>
        Date: ${appointment.date} at ${appointment.time}
        <br/>
        Location: 
        <a 
          href="https://www.google.com/maps/place/Salon+B/@42.3290221,-82.968125,17z/data=!4m14!1m7!3m6!1s0x883b2b3139bbb64b:0x3d8ceac5a5110a10!2sSalon+B!8m2!3d42.3290221!4d-82.9655501!16s%2Fg%2F1xg5tbl2!3m5!1s0x883b2b3139bbb64b:0x3d8ceac5a5110a10!8m2!3d42.3290221!4d-82.9655501!16s%2Fg%2F1xg5tbl2?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" 
        > 
          Salon B - 5965 Wyandotte St E, Windsor, ON N8S 1M9
        </a>      
      </div>
      <br/>
      <div style="display: flex; justify-content:center">
        <a 
          href="${process.env.BACKEND_URL}/api/appointments/confirm/${appointment._id}" 
          style="padding: 10px 20px; color: white; background-color: green; text-decoration: none; border-radius: 5px;"
        > 
          Confirm Appointment
        </a>
      </div>
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
