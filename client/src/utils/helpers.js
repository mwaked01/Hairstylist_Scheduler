import Swal from "sweetalert2";

export const appointmentSubmitMessage = (navigate, clientEmail, appointmentInfo, type) => {
  type === "Submit" ?
    Swal.fire({
      title: `Confirmation Request Sent to ${clientEmail}!`,
      html: `Check your email to confirm the appointment`,
      icon: "info",
      willClose: () => { navigate("/") }
    }) :
    Swal.fire({
      title: `Your Appointment is Booked!`,
      icon: "success",
      html: `
        Service: ${appointmentInfo.serviceName}
        <br/>
        Date: ${appointmentInfo.date} at ${appointmentInfo.time}
      `,
      confirmButtonText: `Great!`,
      confirmButtonAriaLabel: "great!",
      willClose: () => { navigate("/") }
    })
};

export const findNextDay = (dayOfWeek) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentIndex = daysOfWeek.indexOf(dayOfWeek);

  // Return the next day, wrapping around if it's the last day (Saturday -> Sunday)
  return daysOfWeek[(currentIndex + 1) % 7];
};

export const convertTo12HourFormat = (time24) => {
  let [hours, minutes] = time24.split(":").map(Number);

  const period = hours >= 12 ? "P.M" : "A.M";
  hours = hours % 12 || 12; // Convert "0" or "12+" to "12" for 12-hour format

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
};

export const findNextOpening = (dayOfWeek, currentTime, shopHours) => {
  if (dayOfWeek === "Sunday" || dayOfWeek === "Monday") {
    return `Opens on Tuesday 09:00 A.M`;
  }

  if (dayOfWeek === "Saturday" && currentTime >= "15:30") {
    return `Opens on Tuesday 09:00 A.M`;
  }

  if (currentTime < shopHours[dayOfWeek].open) {
    return `Opens at ${shopHours[dayOfWeek].open} A.M`;
  } else if (currentTime >= shopHours[dayOfWeek].close) {
    const nextDay = findNextDay(dayOfWeek);
    return `Opens on ${nextDay} ${shopHours[nextDay]?.open} A.M`;
  }
};


export const generateTimeSlots = () => {
  const slots = [];
  for (let i = 8; i <= 18; i++) {
    // Format hours with leading zero if less than 10
    const hour = i < 10 ? `0${i}` : `${i}`;

    if (i < 12) {
      slots.push(`${hour}:00 AM`);
      slots.push(`${hour}:15 AM`);
      slots.push(`${hour}:30 AM`);
      slots.push(`${hour}:45 AM`);
    } else if (i === 12) {
      slots.push(`${hour}:00 PM`);
      slots.push(`${hour}:15 PM`);
      slots.push(`${hour}:30 PM`);
      slots.push(`${hour}:45 PM`);
    } else {
      const hour12 = i - 12 < 10 ? `0${i - 12}` : `${i - 12}`;
      slots.push(`${hour12}:00 PM`);
      slots.push(`${hour12}:15 PM`);
      slots.push(`${hour12}:30 PM`);
      slots.push(`${hour12}:45 PM`);
    }
  }
  return slots;
};

export function addMinutesToTime(time, minutesToAdd) {
  let [hours, minutes] = time.match(/\d+/g).map(Number);
  const isPM = time.includes("PM");

  // Convert to 24-hour time for easier manipulation
  if (hours === 12 && !isPM) hours = 0; // 12:00 AM case
  if (isPM && hours !== 12) hours += 12; // Convert PM to 24-hour format

  // Add the minutes
  minutes += minutesToAdd;
  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  // Adjust back to 12-hour format
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 or 24 to 12

  // Format time as HH:MM AM/PM
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
}