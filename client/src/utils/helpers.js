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

export const findNextDay = (dayOfWeek) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentIndex = daysOfWeek.indexOf(dayOfWeek);

    // Return the next day, wrapping around if it's the last day (Saturday -> Sunday)
    return daysOfWeek[(currentIndex + 1) % 7];
};

export const convertTo12HourFormat = (time24) => {
    let [hours, minutes] = time24.split(':').map(Number);

    const period = hours >= 12 ? 'P.M' : 'A.M';
    hours = hours % 12 || 12; // Convert "0" or "12+" to "12" for 12-hour format

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
};

export const findNextOpening = (dayOfWeek, currentTime, shopHours) => {
    if (dayOfWeek === 'Sunday' || dayOfWeek === 'Monday') {
        return `Opens on Tuesday 09:00 A.M`;
    }

    if (dayOfWeek === 'Saturday' && currentTime >= "15:30") {
        return `Opens on Tuesday 09:00 A.M`;
    }

    if (currentTime < shopHours[dayOfWeek].open) {
        return `Opens at ${shopHours[dayOfWeek].open} A.M`;
    } else if (currentTime >= shopHours[dayOfWeek].close) {
        const nextDay = findNextDay(dayOfWeek);
        return `Opens on ${nextDay} ${shopHours[nextDay]?.open} A.M`;
    }
};