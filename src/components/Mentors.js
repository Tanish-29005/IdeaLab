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
         <div className="mentor-card mentor-orange">
          <img src="/Bhavesh sir.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Dr. Bhavesh Patel</h5>
          <span className="mentor-role">Chief Mentor</span>
          <p>
            Security, Multimedia Retrieval
          </p>
        </div>
        <div className="mentor-card mentor-blue">
          <img src="/pramod sir 2.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Dr. Pramod Bhavarthe</h5>
          <span className="mentor-role">Co-Ordinator</span>
          <p>
            	Mirowave and Antenna Engg , Sensor Tech , PCB Design
          </p>
        </div>

        <div className="mentor-card mentor-green">
          <img src="/Namrata mam.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Dr. Namrata Manglani</h5>
          <span className="mentor-role">Co Co-Ordinator</span>
          <p>
            Theoretical Physics, Project Management, Institute Industry Interaction, Event Management .
          </p>
        </div>
        <div className="mentor-card mentor-orange">
          <img src="/Amisha mam (2).png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Ms. Amisha Bhoir</h5>
          <span className="mentor-role">Idea Lab Tech Guru</span>
          <p>
            Circuit Design, AI-ML,IoT,PCB Designing,Robotics and Drone, 3-D Printing, Laser Cutting
          </p>
        </div>

        
        <div className="mentor-card mentor-blue">
          <img src="/Santosh sir (2).png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Mr. Santosh Kamble</h5>
          <span className="mentor-role">Idea Lab Tech Guru</span>
          <p>
            Embedded Systems, IoT, Circuit Design, PLC, PCB .
          </p>
        </div>
        <div className="mentor-card mentor-green">
          <img src="/abhay sir.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Mr. Abhay Nichte</h5>
          <span className="mentor-role">Idea Lab Tech Guru</span>
          <p>
            Design Engineering .
          </p>
        </div>

         <div className="mentor-card mentor-orange">
          <img src="/Rishi sir.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Dr. Rishi Kumar</h5>
          <span className="mentor-role">Idea Lab Tech Guru</span>
          <p>
           Design Engineering .
          </p>
        </div>
        <div className="mentor-card mentor-blue">
          <img src="/Nirmol sir (2).png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Mr. Nirmol Munvar</h5>
          <span className="mentor-role">Member</span>
          <p>
            Processor and Protocol Design and Verification, 3D Printing, PCB Design, App Developement .
          </p>
        </div>

        
        
        
    
        <div className="mentor-card mentor-green">
          <img src="/ganesh sir.png" alt="Mentor" className="mentor-img" />
          <h5 className="mentor-name">Mr. Ganesh Nikam</h5>
          <span className="mentor-role">Supporting Staff</span>
          <p>
            Web Development, Visual Studio, Linux .
          </p>
        </div>
      </Marquee>
    </section>
  );
}
