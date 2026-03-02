import "./Footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

       
        <div className="footer-col">
          <h3 className="footer-title">IDEALab SAKEC</h3>
          <p className="footer-text">
            IDEALab at Shah & Anchor Kutchhi Engineering College is a space for
            innovation, prototyping, and interdisciplinary learning, empowering
            students to transform ideas into reality.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">

            <li><NavLink to="/" end>Home</NavLink></li>
        
          <li><NavLink to="/event">Events</NavLink></li>
          <li><NavLink to="/facilities">Facilities</NavLink></li>
          <li><NavLink to="/team">Team</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>

          
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <p className="footer-text">
            Shah & Anchor Kutchhi Engineering College<br />
            Chembur, Mumbai – 400088
          </p>
          <p className="footer-text">
            Email: idealab@sakec.ac.in<br />
      
          </p>
        </div>

      </div>

      
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} IDEALab SAKEC. 
        </p>
      </div>
    </footer>
  );
}
