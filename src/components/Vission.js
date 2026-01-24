import "./vission.css";

export default function Vission() {
  return (
    <>
      {/* HEADER */}
      <div className="vission-header">
        <h6 className="philosophy">OUR PHILOSOPHY</h6>
        <h2 className="vission-text">Vision & Mission</h2>
        <div className="line"></div>
      </div>

      {/* CARDS */}
      <div className="vision-section">
        
        {/* Vision Card */}
        <div className="vision-card vision-bg">
          <img src="/eye.png" alt="vision icon" className="vission-icon" />
          <h5>Vision</h5>
          <p>
            To cultivate a dynamic ecosystem that fosters{" "}
            <span className="vission-highlight">
              innovation, creativity, and excellence
            </span>{" "}
            in education, research, and technology.
          </p>
        </div>

        {/* Mission Card */}
        <div className="vision-card mission-bg">
          <img src="/mission (2).png" alt="mission icon" className="mission-icon" />
          <h5>Mission</h5>
          <p>
            To transform India into a digitally empowered society and knowledge
            economy by providing opportunities that help students{" "}
            <span className="mission-highlight">
              Engage, Explore, Experience, Articulate and Excel
            </span>{" "}
            in their areas of specialization, thereby bolstering the Atma Nirbhar
            Bharat mission.
          </p>
        </div>

      </div>
    </>
  );
}
