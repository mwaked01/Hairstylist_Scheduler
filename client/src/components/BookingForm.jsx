import { useState } from "react";
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";
import ClientInfo from "./ClientInfo";

const BookingForm = (props) => {
  const [formSection, setFormSection] = useState('ClientInfo')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('08:00 Am');

  return (
    <div>
      {formSection === 'Date' ?
        <Calendar
          date={date}
          setDate={setDate}
          setFormSection={setFormSection}
        /> : formSection === 'Time' ?
          <TimePicker
            setTime={setTime}
            date={date}
            setFormSection={setFormSection}
          /> : formSection === 'ClientInfo' ?
            <ClientInfo
              time={time}
              date={date}
              setFormSection={setFormSection}
            /> :
            <p>none</p>
      }

    </div>
  )
}

export default BookingForm;