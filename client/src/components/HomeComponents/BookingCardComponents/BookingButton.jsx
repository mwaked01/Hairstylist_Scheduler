import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";

const BookingButton = () => {
  const navigate = useNavigate();

  return (
    <section id="booking-btn">
      <Button className="btn" onClick={() => { navigate('/Booking') }}>Book Now</Button>
    </section>
  );
};

export default BookingButton;
