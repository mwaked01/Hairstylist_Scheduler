import { useState } from "react";
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";

const BookingForm = (props) => {
  const [formSection, setFormSection] = useState('Date')
  const [date, setDate] = useState(new Date())

  return (
    <div>
      {formSection === 'Date' ?
        <Calendar
          date={date}
          setDate={setDate}
          setFormSection={setFormSection}
        />:formSection === 'Time' ? 
        <TimePicker
        date={date}
        />:
        <p>none</p>
      }

    </div>
  )
}

export default BookingForm;