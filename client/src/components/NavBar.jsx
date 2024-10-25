import "../styles/NavBar.scss"
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="logo" onClick={()=>{navigate('/')}}>
        <img src="/logo_new.png" alt="Logo" />
        {/* <div id="logo-name"> */}
          {/* Hair by Brooke */}
          {/* <br /> */}
        {/* </div> */}
      </div>
      <div className="nav-btns">
        {/* <div>
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
        </div> */}
        {/* <NavLink
          to="/Dashboard"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Dashboard
        </NavLink> */}
      </div>
    </nav>
  );
};

export default NavBar;
