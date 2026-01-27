import { NavLink } from "react-router-dom";
import "./Navbar.css"
export default function Navbar() {
  return (
    <>
      <header className="navbar-wrapper">
        <div className="navbar-inner">

          <div className="nav-left">
            <img src="/sakec logo.png" alt="SAKEC" className="nav-logo" />
            <img src="/IDEA lab logo.png" alt="IDEALab" className="nav-logo-idea" />

            <div className="nav-text">
              <h1>Idealab SAKEC</h1>
              <p>SHAH & ANCHOR KUTCHHI ENGINEERING COLLEGE</p>
            </div>
          </div>

          <nav className="nav-right">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/vision">Vision & Mission</NavLink>
            <NavLink to="/event">Events</NavLink>
            <NavLink to="/facilities">Facilities</NavLink>
            <NavLink to="/team">Team</NavLink>

            <NavLink to="/contact" className="contact-btn">
              Contact Us
            </NavLink>
          </nav>

        </div>
      </header>
      </>
      );
      }