import { useState, useEffect } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Import copy icon

import { convertTo12HourFormat, findNextOpening } from '../../utils/helpers';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const BookingCard = (props) => {
  // Shop hours (24-hour format for comparison)
  const shopHours = {
    Tuesday: { open: "09:00", close: "19:00" },
    Wednesday: { open: "09:00", close: "19:00" },
    Thursday: { open: "09:00", close: "19:00" },
    Friday: { open: "09:00", close: "19:00" },
    Saturday: { open: "08:00", close: "15:30" },
    Sunday: { open: null, close: null },
    Monday: { open: null, close: null },
  };

  const shopAddress = '5965 Wyandotte St E, Windsor, ON';

  const [status, setStatus] = useState("");
  const [nextOpening, setNextOpening] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");


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



  // Handle dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle copying the address to clipboard
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(shopAddress).then(() => {
      setCopySuccess("Address copied!"); // Optional success message
      setTimeout(() => setCopySuccess(""), 2000); // Clear success message after 2 seconds
    }).catch(() => {
      setCopySuccess("Failed to copy address.");
    });
  };

  return (
    <div id="BookingCard">
      <section id="booking-btn">
        <Button className="btn">Book Now</Button>
      </section>
      
      <div id="shop-info">
        <section id="open-hours" style={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeIcon />
          <span>{status} {status === "Closed" && nextOpening}</span>
          <IconButton onClick={handleClick}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {Object.keys(shopHours).map((day) => (
              <MenuItem key={day}>
                {day}: {shopHours[day].open ? `${shopHours[day].open} a.m - ${shopHours[day].close} p.m` : "Closed"}
              </MenuItem>
            ))}
          </Menu>
        </section>

        {/* Location with copy button */}
        <section id='location' style={{ display: 'flex', alignItems: 'center' }}>
          <div id="address">
            <LocationOnIcon />
            <span>{shopAddress}</span>
            <IconButton onClick={handleCopyAddress}>
              <ContentCopyIcon />
            </IconButton>
          </div>
          {copySuccess && <p style={{ color: 'green' }}>{copySuccess}</p>} {/* Optional copy success message */}

          <APIProvider apiKey={apiKey}>
            <Map
              style={{ width: '94%', height: '10rem', padding: '0.5em' }}
              center={{ lat: 42.328800, lng: -82.965390 }}
              zoom={15}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId={'b7e23fa7e58213f '}
              controlled={true}
            >
              <AdvancedMarker position={{ lat: 42.328800, lng: -82.965390 }} />
            </Map>
          </APIProvider>
        </section>
      </div>

    </div>
  );
};

export default BookingCard;
