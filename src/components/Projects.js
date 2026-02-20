import { useEffect, useRef, useState } from "react";
import "./Projects.css";
import Navbar from "./Navbar.js";

const projects = [
  {
    title: "Autonomous Surveillance Drone",
    mentor: "prof.Amisha Bhoir",
    team: "Swatantra Systems",
    problem:
      "Designed for real-time aerial monitoring and threat detection using onboard AI.",
    components: [
      "3d Printer",
      "Lab Space",
      
    ],
    outcome: "Demonstrated to industry mentors",
    image: "/Drone.jpeg",
    thumb: "/Drone.jpeg"
  },
  {
    title: "Smart Waste Segregation",
    mentor: "Prof. R. Mehta",
    team: "EcoTech",
    problem:
      "Automated waste segregation using sensors to improve recycling efficiency.",
    components: [
      "Electronics Lab",
      "Sensor Kits",
      "Rapid Prototyping Tools"
    ],
    outcome: "Winner – State Level Hackathon",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  },
  {
    title: "IoT Energy Monitoring",
    mentor: "Dr. P. Kulkarni",
    team: "VoltVision",
    problem:
      "Real-time energy monitoring system to reduce power wastage in labs.",
    components: [
      "IoT Development Lab",
      "Energy Meters",
      "Cloud Compute Facility"
    ],
    outcome: "Used inside IdeaLab",
    image: "/iot.png",
    thumb: "/iot.png"
  }
];

export default function ProjectsHeroSlider() {
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;

    const onScroll = () => {
      const index = Math.round(slider.scrollLeft / window.innerWidth);
      setActive(index);
    };

    slider.addEventListener("scroll", onScroll);
    return () => slider.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (index) => {
    sliderRef.current.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth"
    });
  };

  return (
    <>
    <Navbar />
    
    <section className="ps-hero">
      <div className="ps-slides" ref={sliderRef}>
        {projects.map((p, i) => (
          <div
            key={i}
            className="ps-slide"
            style={{ backgroundImage: `url(${p.image})` }}
          >
            <div className="ps-overlay" />

            <div className="ps-content">
              <span className="ps-label">IDEALAB PROJECT</span>

              <h1 className="ps-title">{p.title}</h1>

              <p className="ps-problem">{p.problem}</p>

              <div className="ps-meta">
                <span><strong>Mentor:</strong> {p.mentor}</span>
                <span><strong>Team:</strong> {p.team}</span>
              </div>

              {/* Components / Facilities */}
              <div className="ps-components">
                {p.components.map((c, idx) => (
                  <span key={idx} className="ps-chip">{c}</span>
                ))}
              </div>

              <p className="ps-outcome">
                <strong>Outcome:</strong> {p.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div className="ps-thumbs">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`ps-thumb ${active === i ? "active" : ""}`}
            onClick={() => scrollTo(i)}
          >
            <img src={p.thumb} alt={p.title} />
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
