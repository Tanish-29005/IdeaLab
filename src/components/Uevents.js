import { useEffect, useRef, useState } from "react";
import "./Uevents.css";

export default function Uevents() {
  const images = ["/iot.png", "/pcb.png", "/collage.png"];
  const [index, setIndex] = useState(0);

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const headerRef = useRef(null);

  // Image slider (unchanged)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  // Scroll-progress animation
  useEffect(() => {
    const animateOnScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress: 0 → 1
      const progress = Math.min(
        Math.max((vh - rect.top) / (vh * 0.85), 0),
        1
      );

      if (headerRef.current) {
        headerRef.current.style.opacity = progress;
        headerRef.current.style.transform = `translateY(${30 * (1 - progress)}px)`;
      }

      if (leftRef.current) {
        leftRef.current.style.opacity = progress;
        leftRef.current.style.transform = `translateX(${-120 * (1 - progress)}px)`;
      }

      if (rightRef.current) {
        rightRef.current.style.opacity = progress;
        rightRef.current.style.transform = `translateX(${120 * (1 - progress)}px)`;
      }
    };

    const raf = () => {
      animateOnScroll();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="hack-section">
      
      {/* Header */}
      <div ref={headerRef} className="section-header scroll-fade">
        <span className="header-line"></span>
        <span className="header-text">DON'T MISS OUT</span>
        <span className="header-line"></span>
      </div>

      <div className="hack-container">
        
        {/* LEFT CONTENT */}
        <div ref={leftRef} className="hack-left scroll-left">
          <span className="live-pill">
            <span className="live-dot" />
            LIVE REGISTRATION
          </span>

          <h1 className="hack-title">IoT: Imagine, Build, Connect</h1>

          <p className="hack-subtitle">
            A hands-on workshop exploring the fundamentals of Internet of Things and real-world applications.
          </p>

          <div className="hack-details">
            <div className="detail-item">
              <div className="icon-box">📅</div>
              <div className="detail-text">
                <span className="detail-label">DATE</span>
                <p className="detail-value">October 15–16, 2025</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-box">📍</div>
              <div className="detail-text">
                <span className="detail-label">VENUE</span>
                <p className="detail-value">7th Floor Auditorium, SAKEC</p>
              </div>
            </div>
          </div>

          <p className="hack-desc">
            This session aims to inspire innovation, encourage collaboration, and provide a strong foundation for students interested in embedded systems.
          </p>

          <button className="hack-btn">
            Register Now →
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div ref={rightRef} className="hack-right scroll-right">
          <div className="image-card">
            <img src={images[index]} alt="event" className="slider-image" />

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
