import "./Event.css";
import Footer from "./Footer.js"
import Navbar from "./Navbar.js";


export default function Event() {
  return (
    <>
      {/*Navbar */}
      <Navbar />
      {/* HEADER */}
      <section className="event-hero">
        <span className="event-tag">WORKSHOPS & SEMINARS</span>
        <h1>Upcoming Events</h1>
        <p>Join our hands-on sessions to upgrade your skills.</p>
      </section>

      {/* EVENTS GRID */}
      <section className="event-container">

        {/* EVENT CARD */}
        <div className="event-card">
          <img src="/events/pcb.png" alt="PCB Workshop" />

          <div className="event-content">
            <span className="badge upcoming">Upcoming</span>

            <h3>Industry Awareness Program</h3>
            <p>
              An exclusive session for industry professionals to explore
              advanced prototyping facilities.
            </p>

            <div className="event-info">
              <span>🕒 1:00 PM – 3:00 PM</span>
              <span>📍 Idea Lab 61 & 62, SAKEC</span>
            </div>

            <button className="event-btn">Register Now</button>
          </div>
        </div>

        {/* EVENT CARD */}
        <div className="event-card">
          <img src="/events/arvr.png" alt="AR VR Workshop" />

          <div className="event-content">
            <span className="badge upcoming">Upcoming</span>

            <h3>Inception: Portal to AR-VR</h3>
            <p>
              Dive into the world of Augmented and Virtual Reality.
              Learn Unity basics and experience immersive tech.
            </p>

            <div className="event-info">
              <span>🕒 10:00 AM – 4:00 PM</span>
              <span>📍 7th Floor Auditorium</span>
            </div>

            <button className="event-btn">Register Now</button>
          </div>
        </div>

        {/* COMPLETED EVENT */}
        <div className="event-card completed">
          <img src="/events/expo.png" alt="Tech Expo" />

          <div className="event-content">
            <span className="badge completed">Completed</span>

            <h3>SAKEC Tech Expo 2024</h3>
            <p>
              Annual technical symposium showcasing student innovations,
              startups and research projects.
            </p>

            <div className="event-info">
              <span>📅 Past Event</span>
            </div>

            <button className="event-btn disabled">Event Completed</button>
          </div>
        </div>

      </section>

      <Footer />
    </>
  );
}
