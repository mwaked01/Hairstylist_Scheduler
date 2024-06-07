import "../styles/NavBar.scss"
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <nav>
      <div className="logo" >
        <img src="/Logo_head.png" alt="Logo" />
        Beautify By Brooke
      </div>
      <div className="nav-btns">
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
      </div>
    </nav>
  );
};

export default NavBar;
