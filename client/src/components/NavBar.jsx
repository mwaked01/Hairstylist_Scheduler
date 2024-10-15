import "../styles/NavBar.scss"
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <nav>
      <div className="logo" >
        <img src="/Logo_head.png" alt="Logo" />
        <div id="logo-name">
          Hair by
          <br />
          Brooke
        </div>
      </div>
      <div className="nav-btns">
        <div>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </div>
        <div id="booking-btn">
          <NavLink
            to="/Booking"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Book an Appointment
          </NavLink>
        </div>
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
