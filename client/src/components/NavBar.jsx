import "../styles/NavBar.scss"
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Home
      </NavLink>
      <NavLink 
        to="/Booking" 
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Book an Appointment
      </NavLink>
      <NavLink 
        to="/Dashboard" 
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Dashboard
      </NavLink>
    </nav>
  );
};

export default NavBar;
