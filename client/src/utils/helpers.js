import Swal from "sweetalert2";

export const appointmentSubmitMessage = (navigate, clientEmail, appointmentInfo, type) => {
  type === "Submit" ?
    Swal.fire(`Confirmation Request Sent to ${clientEmail}!`, `Check your email to confirm the appointment`, "info")
    : Swal.fire({
      title: `Your Appointment is Booked!`,
      icon: "success",
      html: `
        Service: ${appointmentInfo.serviceName}
        <br/>
        Date: ${appointmentInfo.date}
      `,
      confirmButtonText: `
       Great!
      `,
      confirmButtonAriaLabel: "great!"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
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
