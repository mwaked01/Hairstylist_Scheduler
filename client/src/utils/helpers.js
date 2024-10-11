import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const SERVICE_ID = "service_75bbx39";
const TEMPLATE_ID = "template_by4xcpt";
const USER_ID = "n_JyyoXkMteWYmNiR";

// Function to send an email
export const sendConfirmationEmail = (appointment, client, clientByEmail, navigate) => {
    const templateParams = clientByEmail !== null ? {
        firstName: clientByEmail.firstName,
        lastName: clientByEmail.lastName,
        time: appointment.time,
        date: appointment.date,
        service: client.service.name,
        email: clientByEmail.email
    } :
        {
            firstName: client.firstName,
            lastName: client.lastName,
            time: appointment.time,
            date: appointment.date,
            service: client.service.name,
            email: client.email
        }
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
        .then((result) => {
            Swal.fire({
                icon: 'success',
                title: clientByEmail !== null ?
                    `Confirmation email has been sent to ${clientByEmail.email}` :
                    `Confirmation email has been sent to ${client.email}`,
            })
            navigate('/')
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Ooops, something went wrong',
                text: error.text,
            })
        });
};