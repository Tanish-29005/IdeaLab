import { useEffect, useRef } from "react";
import MarqueeModule from "react-fast-marquee";
import "./Mentors.css";

const Marquee = MarqueeModule.default || MarqueeModule;

export default function Mentors() {
  const sectionRef = useRef(null);

  // Scroll-progress reveal for whole section
  useEffect(() => {
    const animate = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = Math.min(
        Math.max((vh - rect.top) / (vh * 0.85), 0),
        1
      );

      sectionRef.current.style.opacity = progress;
      sectionRef.current.style.transform = `translateY(${30 * (1 - progress)}px)`;
    };

    const raf = () => {
      animate();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="mentor-section scroll-mentor">
      <h1 className="mentor-heading">Our Mentors</h1>
      <h4>Dedicated faculty and experts guiding your innovation journey.</h4>

      <Marquee
        speed={45}
        pauseOnHover={true}
        pauseOnClick={true}
        gradient={false}
        autoFill={true}
      >
        <div className="mentor-card mentor-blue">
          <img src="/Amisha mam.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Ms. Amisha Bhoir</h5>
          <span className="mentor-role">Faculty Co-ordinator</span>
          <p>
            Driving the lab's vision and coordinating student activities and
            workshops.
          </p>
        </div>

        <div className="mentor-card mentor-green">
          <img src="/Nirmol sir.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Mr. Nirmol Munvar</h5>
          <span className="mentor-role">Idea Lab Tech Guru</span>
          <p>
            Expert in PCB design, electronics, and technical mentorship for
            student projects.
          </p>
        </div>

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
