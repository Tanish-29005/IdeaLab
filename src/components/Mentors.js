import MarqueeModule from "react-fast-marquee";
import "./Mentors.css";

const Marquee = MarqueeModule.default || MarqueeModule;

export default function Mentors() {
  return (
    <section className="mentor-section">
      <h2 className="mentor-heading">Our Mentors</h2>

      <Marquee
        speed={45}
        pauseOnHover={true}
        pauseOnClick={true}
        gradient={false}
        autoFill={true}
      >
        {/* Mentor 1 */}
        <div className="mentor-card mentor-blue">
          <img src="/Amisha mam.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Ms. Amisha Bhoir</h5>
          <span className="mentor-role">Faculty Co-ordinator</span>
          <p>
            Driving the lab's vision and coordinating student activities and
            workshops.
          </p>
        </div>

        {/* Mentor 2 */}
        <div className="mentor-card mentor-green">
          <img src="/Nirmol sir.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Mr. Nirmol Munvar</h5>
          <span className="mentor-role">Idea Lab Tech Guru</span>
          <p>
            Expert in PCB design, electronics, and technical mentorship for
            student projects.
          </p>
        </div>

        {/* Mentor 3 */}
        <div className="mentor-card mentor-orange">
          <img src="/santosh sir.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Mr. Santosh Kamble</h5>
          <span className="mentor-role">Idea Lab Tech Guru</span>
          <p>
            Specializing in mechanical prototyping, laser cutting, and workshop
            safety.
          </p>
        </div>
      </Marquee>
    </section>
  );
}