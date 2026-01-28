import { useEffect, useRef } from "react";
import "./vission.css";

export default function Vission() {
  const headerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useEffect(() => {
    const elements = [
      { el: headerRef.current, dir: "up" },
      { el: leftCardRef.current, dir: "left" },
      { el: rightCardRef.current, dir: "right" }
    ];

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      elements.forEach(({ el, dir }) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();

        // progress: 0 → 1
        const progress = Math.min(
          Math.max((viewportHeight - rect.top) / (viewportHeight * 0.75), 0),
          1
        );

        let translateX = 0;
        let translateY = 0;

        if (dir === "left") translateX = -120 * (1 - progress);
        if (dir === "right") translateX = 120 * (1 - progress);
        if (dir === "up") translateY = 40 * (1 - progress);

        el.style.transform = `translate(${translateX}px, ${translateY}px)`;
        el.style.opacity = progress;
      });
    };

    const rafScroll = () => {
      handleScroll();
      requestAnimationFrame(rafScroll);
    };

    requestAnimationFrame(rafScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <div ref={headerRef} className="vission-header scroll-header">
        <h6 className="philosophy">OUR PHILOSOPHY</h6>
        <h2 className="vission-text">Vision & Mission</h2>
        <div className="line"></div>
      </div>

      {/* CARDS */}
      <div className="vision-section">
        {/* Vision Card */}
        <div
          ref={leftCardRef}
          className="vision-card vision-bg scroll-left"
        >
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
        <div
          ref={rightCardRef}
          className="vision-card mission-bg scroll-right"
        >
          <img
            src="/mission (2).png"
            alt="mission icon"
            className="mission-icon"
          />
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
