import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Button, IconButton } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { convertTo12HourFormat, findNextOpening } from '../../utils/helpers';
import axios from 'axios';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const BookingCard = (props) => {
  const { shopInfo } = props;
  const shopHours = shopInfo.operationHours;
  const shopAddress = shopInfo.location;

  const [status, setStatus] = useState("");
  const [nextOpening, setNextOpening] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Get current date and time
    const now = new Date();
    const dayOfWeek = now.toLocaleDateString("en-US", { weekday: 'long' });
    const currentTime = now.toTimeString().slice(0, 5);
    const isOpen = shopHours[dayOfWeek]?.open && currentTime >= shopHours[dayOfWeek]?.open && currentTime <= shopHours[dayOfWeek]?.close;

    if (isOpen) {
      setStatus(`Open until ${convertTo12HourFormat(shopHours[dayOfWeek].close)}`);
    } else {
      setStatus("Closed");
      setNextOpening(findNextOpening(dayOfWeek, currentTime, shopHours));
    }

  }, []);

  // Handle copying the address to clipboard
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(shopAddress).then(() => {
      setCopySuccess("Address copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear success message after 2 seconds
    }).catch(() => {
      setCopySuccess("Failed to copy address.");
    });
  };

  return (
    <div id="BookingCard">
      <section id="booking-btn">
        <Button className="btn" onClick={() => { navigate('/Booking') }}>Book Now</Button>
      </section>

      <div id="shop-info">
        <section id="open-hours" style={{ display: 'flex', alignItems: 'center' }}>
          <Accordion id="hours">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <AccessTimeIcon />
              <span>{status} {status === "Closed" && nextOpening}</span>
            </AccordionSummary>
            {Object.keys(shopHours).map((day) => (
              <AccordionDetails key={day}>
                {day}: {shopHours[day].open ? `${shopHours[day].open} a.m - ${convertTo12HourFormat(shopHours[day].close)} p.m` : "Closed"}
              </AccordionDetails>
            ))}
          </Accordion>

        </section>

        <section id='location' style={{ display: 'flex', alignItems: 'center' }}>
          <div id="address">
            <LocationOnIcon />
            <span>{shopAddress.address}</span>
            <IconButton onClick={handleCopyAddress}>
              <ContentCopyIcon />
            </IconButton>
          </div>
          {copySuccess && <p style={{ color: 'green' }}>{copySuccess}</p>}

          <APIProvider apiKey={apiKey}>
            <Map
              style={{ width: '94%', height: '10rem', padding: '0.5em' }}
              center={{ lat: shopAddress.lat, lng: shopAddress.lng }}
              zoom={15}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId={'b7e23fa7e58213f '}
              controlled={true}
            >
              <AdvancedMarker position={{ lat: shopAddress.lat, lng: shopAddress.lng }} />
            </Map>
          </APIProvider>
        </section>
      </div>

    </div>
  );
};

export default BookingCard;
