import { useEffect, useRef, useState } from "react";
import "./Uevents.css";

const SHEET_ID = "11r6awyQn69HkXY_jBCIqhCezwEySBra5shXcA1U283s";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=0`;

// 🔥 GOOGLE DRIVE LINK CONVERTER
const extractFileId = (url) => {
  if (!url || typeof url !== 'string' || !url.includes("drive.google.com")) return null;
  
  const fileMatch = url.match(/\/file\/d\/([^\/\?]+)/);
  if (fileMatch) return fileMatch[1];
  
  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch) return idMatch[1];
  
  const openMatch = url.match(/open\?id=([^&]+)/);
  if (openMatch) return openMatch[1];
  
  return null;
};

const convertDriveLink = (url) => {
  if (!url || typeof url !== 'string') return "";
  
  const fileId = extractFileId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  
  return url;
};

export default function Uevents() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("");
  const [imgLoading, setImgLoading] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);
  const attemptedUrls = useRef(new Set());

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

  const tryAlternativeUrl = (currentUrl) => {
    if (!currentUrl || typeof currentUrl !== 'string') return null;
    
    const fileId = extractFileId(currentUrl);
    if (!fileId) return null;

    const alternatives = [
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      `https://lh3.googleusercontent.com/d/${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      `https://docs.google.com/uc?export=download&id=${fileId}`,
    ];

    for (const altUrl of alternatives) {
      if (!attemptedUrls.current.has(altUrl)) {
        attemptedUrls.current.add(altUrl);
        return altUrl;
      }
    }
    
    return null;
  };

  const handleImageError = () => {
    console.log(`Uevents image failed (attempt ${attemptCount + 1}):`, imgSrc);
    
    const nextUrl = tryAlternativeUrl(imgSrc);
    
    if (nextUrl && attemptCount < 5) {
      console.log(`Trying alternative URL:`, nextUrl);
      setAttemptCount(attemptCount + 1);
      setImgSrc(nextUrl);
    } else {
      console.log("All attempts failed, using fallback");
      setImgLoading(false);
      setImgSrc("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800");
    }
  };

  const handleImageLoad = () => {
    console.log("Uevents image loaded successfully:", imgSrc);
    setImgLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const json = JSON.parse(text.substring(47, text.length - 2));
        const rows = json?.table?.rows || [];

        const data = rows.map((row, i) => {
          const imageUrl = row.c?.[6]?.v || "";
          const convertedImage = convertDriveLink(imageUrl);
          
          return {
            id: i,
            title: row.c?.[0]?.v || "",
            dateRaw: row.c?.[1]?.v || null,
            time: row.c?.[2]?.v || "",
            location: row.c?.[3]?.v || "",
            description: row.c?.[4]?.v || "",
            image: convertedImage,
            registrationLink: row.c?.[7]?.v || "#"
          };
        })
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

        // Initialize image loading
        if (selectedEvent?.image) {
          console.log("Uevents - Loading image:", selectedEvent.image);
          setImgLoading(true);
          setAttemptCount(0);
          attemptedUrls.current = new Set([selectedEvent.image]);
          setImgSrc(selectedEvent.image);
        }

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
            {imgLoading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
              }} />
            )}
            <img
              src={imgSrc || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
              alt={event.title}
              className="slider-image"
              style={{ display: imgLoading ? 'none' : 'block' }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        </div>

      </div>
    </section>
  );
}