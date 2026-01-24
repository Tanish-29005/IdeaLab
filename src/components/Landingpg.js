import { NavLink } from "react-router-dom";
import "./Landingpg.css";
import HeroCarousel from "./HeroCarousel.js";
import Vission from "./Vission.js";
import Mentors from "./Mentors.js";
import MarqueeComponent from "./MarqueeComponent.js";
import Footer from "./Footer.js";
import Event from "./Event.js";

export default function Landingpg() {
  return (
    <>
      <header className="navbar-wrapper">
        <div className="navbar-inner">

          <div className="nav-left">
            <img src="https://www.shahandanchor.com/metsmartcampus/Images/Blue_Logo-With%20SM.jpg" alt="SAKEC" className="nav-logo" />
            <img src="/IDEA lab logo.png" alt="IDEALab" className="nav-logo" />

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

      {/* HERO */}
      <HeroCarousel />
      {/*Marquee*/}
      <MarqueeComponent />
      {/*vission & mission*/}
      <Vission />
      {/*Mentors*/}
      <Mentors />
      {/*Footer*/}
      <Footer />
      
    </>
  );
}
