import { useEffect, useState } from "react";
import "./Uevents.css";

export default function Uevents() {
  // Use placeholder images if you don't have the local files yet to test
  const images = [
    "/iot.png", // Ensure these exist in your public folder
    "/pcb.png",
    "/collage.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="hack-section">
      
      {/* Top faint header */}
      <div className="section-header">
        <span className="header-line"></span>
        <span className="header-text">DON'T MISS OUT</span>
        <span className="header-line"></span>
      </div>

      <div className="hack-container">
        {/* LEFT CONTENT */}
        <div className="hack-left">
          
          <div className="tag-wrapper">
            <span className="live-pill">
              <span className="live-dot" />
              LIVE REGISTRATION
            </span>
          </div>

          <h1 className="hack-title">IoT: Imagine, Build, Connect</h1>

          <p className="hack-subtitle">
            A hands-on workshop exploring the fundamentals of Internet of Things and real-world applications.
          </p>

          <div className="hack-details">
            {/* Date Row */}
            <div className="detail-item">
              <div className="icon-box">
                {/* Calendar SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="detail-text">
                <span className="detail-label">DATE</span>
                <p className="detail-value">October 15–16, 2025</p>
              </div>
            </div>

            {/* Venue Row */}
            <div className="detail-item">
              <div className="icon-box">
                {/* Location SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="detail-text">
                <span className="detail-label">VENUE</span>
                <p className="detail-value">7th Floor Auditorium, SAKEC</p>
              </div>
            </div>
          </div>

          <p className="hack-desc">
            This session aims to inspire innovation, encourage collaboration, and provide a strong foundation for students interested in embedded systems, smart devices, and future technologies.
          </p>

          <button className="hack-btn">
            Register Now 
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className="hack-right">
          <div className="image-card">
            <img 
              src={images[index]} 
              alt="Hackathon Event" 
              className="slider-image"
            />

            

            {/* Pagination Dots */}
            <div className="slider-dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}