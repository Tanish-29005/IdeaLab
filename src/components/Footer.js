import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT : ABOUT */}
        <div className="footer-col">
          <h3 className="footer-title">IDEALab SAKEC</h3>
          <p className="footer-text">
            IDEALab at Shah & Anchor Kutchhi Engineering College is a space for
            innovation, prototyping, and interdisciplinary learning, empowering
            students to transform ideas into reality.
          </p>
        </div>

        {/* CENTER : QUICK LINKS */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>Home</li>
            <li>Vision & Mission</li>
            <li>Facilities</li>
            <li>Mentors</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* RIGHT : CONTACT */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <p className="footer-text">
            Shah & Anchor Kutchhi Engineering College<br />
            Chembur, Mumbai – 400088
          </p>
          <p className="footer-text">
            Email: idealab@sakec.ac.in<br />
            Phone: +91 98765 43210
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} IDEALab SAKEC. 
        </p>
      </div>
    </footer>
  );
}
