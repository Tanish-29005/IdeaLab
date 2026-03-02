import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="navbar-inner">

        <div className="nav-left">
          <img src="/sakec logo.png" alt="SAKEC" className="nav-logo" />
          <img src="/IDEA lab logo.png" alt="IDEALab" className="nav-logo-idea" />

          <div className="nav-text">
            <h1>SAKEC AICTE IDEALab</h1>
            <p>Shah & Anchor Kutchhi Engineering College</p>
          </div>
        </div>

        <nav className="nav-right desktop-menu">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/event">Events</NavLink>
          <NavLink to="/facilities">Facilities</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/projects">Projects</NavLink>

          <NavLink to="/contact" className="contact-btn">
            Contact Us
          </NavLink>
        </nav>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/event" onClick={closeMenu}>Events</NavLink>
        <NavLink to="/facilities" onClick={closeMenu}>Facilities</NavLink>
        <NavLink to="/team" onClick={closeMenu}>Team</NavLink>
        <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
        <NavLink to="/contact" className="contact-btn" onClick={closeMenu}>
          Contact Us
        </NavLink>
      </div>

    </header>
  );
}