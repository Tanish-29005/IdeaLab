import { useEffect, useRef, useState } from "react";
import "./Uevents.css";

const SHEET_ID = "11r6awyQn69HkXY_jBCIqhCezwEySBra5shXcA1U283s";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=0`;

export default function Uevents() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const headerRef = useRef(null);

  // 🔥 UNIVERSAL DATE PARSER
  const parseDate = (value) => {
    if (!value) return null;

    // If already JS Date object
    if (value instanceof Date) return value;

    // If format: Date(2026,2,3)
    if (typeof value === "string" && value.startsWith("Date(")) {
      const parts = value
        .replace("Date(", "")
        .replace(")", "")
        .split(",");
      return new Date(parts[0], parts[1], parts[2]);
    }

    // If ISO string: 2026-03-03
    return new Date(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const json = JSON.parse(text.substring(47, text.length - 2));
        const rows = json?.table?.rows || [];

        const data = rows.map((row, i) => ({
          id: i,
          title: row.c?.[0]?.v || "",
          dateRaw: row.c?.[1]?.v || null,
          time: row.c?.[2]?.v || "",
          location: row.c?.[3]?.v || "",
          description: row.c?.[4]?.v || "",
          image: row.c?.[6]?.v || "",
          registrationLink: row.c?.[7]?.v || "#"
        }))
        .filter(e => e.dateRaw); // must have date

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const allEvents = data
          .map(e => ({
            ...e,
            parsedDate: parseDate(e.dateRaw)
          }))
          .filter(e => e.parsedDate instanceof Date && !isNaN(e.parsedDate))
          .sort((a, b) => a.parsedDate - b.parsedDate);

        const upcoming = allEvents.filter(
          e => e.parsedDate >= today
        );

        let selectedEvent;

        if (upcoming.length > 0) {
          selectedEvent = upcoming[0];
        } else {
          selectedEvent = allEvents[allEvents.length - 1];
        }

        setEvent(selectedEvent || null);
        setLoading(false);

      } catch (err) {
        console.error("Landing event fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const animateOnScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = Math.min(
        Math.max((vh - rect.top) / (vh * 0.85), 0),
        1
      );

      if (headerRef.current) {
        headerRef.current.style.opacity = progress;
        headerRef.current.style.transform =
          `translateY(${30 * (1 - progress)}px)`;
      }

      if (leftRef.current) {
        leftRef.current.style.opacity = progress;
        leftRef.current.style.transform =
          `translateX(${-120 * (1 - progress)}px)`;
      }

      if (rightRef.current) {
        rightRef.current.style.opacity = progress;
        rightRef.current.style.transform =
          `translateX(${120 * (1 - progress)}px)`;
      }
    };

    const raf = () => {
      animateOnScroll();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  if (loading || !event) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isUpcoming = event.parsedDate >= today;

  return (
    <section ref={sectionRef} className="hack-section">

      <div ref={headerRef} className="section-header scroll-fade">
        <span className="header-line"></span>
        <span className="header-text">
          {isUpcoming ? "DON'T MISS OUT" : "RECENTLY CONDUCTED"}
        </span>
        <span className="header-line"></span>
      </div>

      <div className="hack-container">

        <div ref={leftRef} className="hack-left scroll-left">

          <span className="live-pill">
            <span className="live-dot" />
            {isUpcoming ? "LIVE REGISTRATION" : "EVENT COMPLETED"}
          </span>

          <h1 className="hack-title">{event.title}</h1>

          <p className="hack-subtitle">
            {event.description}
          </p>

          <div className="hack-details">
            <div className="detail-item">
              <div className="icon-box">📅</div>
              <div className="detail-text">
                <span className="detail-label">DATE</span>
                <p className="detail-value">
                  {event.parsedDate.toDateString()}
                </p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-box">📍</div>
              <div className="detail-text">
                <span className="detail-label">VENUE</span>
                <p className="detail-value">{event.location}</p>
              </div>
            </div>
          </div>

          {isUpcoming && (
            <button
              className="hack-btn"
              onClick={() =>
                window.open(event.registrationLink, "_blank")
              }
            >
              Register Now →
            </button>
          )}

        </div>

        <div ref={rightRef} className="hack-right scroll-right">
          <div className="image-card">
            <img
              src={event.image}
              alt={event.title}
              className="slider-image"
            />
          </div>
        </div>

      </div>
    </section>
  );
}