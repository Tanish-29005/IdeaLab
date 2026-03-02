import React, { useEffect, useState, useRef } from "react";
import "./Event.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle2,
  Loader2,
  ChevronLeft
} from "lucide-react";

const SHEET_ID = "11r6awyQn69HkXY_jBCIqhCezwEySBra5shXcA1U283s";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=0`;

const convertDriveLink = (url) => {
  if (!url) return "";

  if (url.includes("drive.google.com")) {
    // Extract file ID from /file/d/{fileId}/ format
    const fileMatch = url.match(/\/file\/d\/(.*?)(?:\/|$)/);
    if (fileMatch && fileMatch[1]) {
      // Use thumbnail URL which works better for public images
      return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1000`;
    }

    // Extract file ID from ?id= format
    const idMatch = url.match(/[?&]id=([^&]+)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
    }

    // Extract from open?id= format
    const openMatch = url.match(/open\?id=([^&]+)/);
    if (openMatch && openMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w1000`;
    }
  }

  return url;
};

const EventCard = ({ event }) => (
  <div className="event-card">
    <div className="card-media">
      <img 
        src={event.image} 
        alt={event.title}
        onError={(e) => {
          // Fallback if image fails to load
          e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800";
        }}
      />
      <span className="category-badge">{event.category}</span>
    </div>

    <div className="card-body">
      <div className="date">
        <Calendar size={14} />
        {event.date}
      </div>

      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <div className="meta">
        <div className="meta-item">
          <Clock size={14} />
          <span>{event.time || "TBA"}</span>
        </div>

        <div className="meta-item">
          <MapPin size={14} />
          <span>{event.location || "TBA"}</span>
        </div>
      </div>

      <a href={event.registrationLink} className="register-btn">
        Register <ChevronRight size={16} />
      </a>
    </div>
  </div>
);

const PastEventCard = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = event.images.filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="past-card">
      <div className="past-card-content">
        <div className="past-card-info">
          <div className="impact">
            <CheckCircle2 size={14} />
            {event.impact || "Completed"}
          </div>

          <h4>{event.title}</h4>

          <div className="past-meta">
            <div className="past-meta-item">
              <Calendar size={14} />
              <span>{event.date}</span>
            </div>

            {event.location && (
              <div className="past-meta-item">
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <p>{event.description}</p>
        </div>

        {images.length > 0 && (
          <div className="carousel-container">
            <img
              src={images[currentImageIndex]}
              alt=""
              className="carousel-image"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800";
              }}
            />

            {images.length > 1 && (
              <>
                <button className="carousel-btn prev" onClick={prevImage}>
                  <ChevronLeft size={20} />
                </button>

                <button className="carousel-btn next" onClick={nextImage}>
                  <ChevronRight size={20} />
                </button>

                <div className="carousel-indicators">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`indicator ${
                        idx === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Event() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth"
    });
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
          date: row.c?.[1]?.f || "",
          time: row.c?.[2]?.v || "",
          location: row.c?.[3]?.v || "",
          description: row.c?.[4]?.v || "",
          category: row.c?.[5]?.v || "Event",
          image: convertDriveLink(
            row.c?.[6]?.v ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
          ),
          registrationLink: row.c?.[7]?.v || "#",
          impact: row.c?.[8]?.v || "",
          images: row.c?.[9]?.v
            ? row.c[9].v
                .split(",")
                .map(i => convertDriveLink(i.trim()))
            : []
        }));

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setUpcoming(data.filter(e => new Date(e.date) >= today));
        setPast(data.filter(e => new Date(e.date) < today));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <section className="events-section">
        <div className="upcoming-header">
          <div className="header-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>

          <h1 className="upcoming-title">Upcoming Events</h1>
          <p className="upcoming-subtitle">
            Join us for exciting opportunities to learn, connect, and grow
          </p>
          <div className="title-underline"></div>
        </div>

        {loading ? (
          <div className="loader-container">
            <Loader2 className="spinner" size={48} />
          </div>
        ) : upcoming.length === 0 ? (
          <div className="empty-state">
            <p>No upcoming events at the moment.</p>
          </div>
        ) : (
          <div className="events-grid">
            {upcoming.map(e => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      <section className="past-section">
        <div className="past-container">
          <h2>Past Events</h2>

          {past.length === 0 ? (
            <div className="empty-state-dark">
              <p>No past events to display.</p>
            </div>
          ) : (
            <div className="past-slider-wrapper">
              <button className="slider-arrow left" onClick={scrollLeft}>
                <ChevronLeft size={20} />
              </button>

              <div className="past-slider" ref={sliderRef}>
                {past.map(e => (
                  <div className="past-slide" key={e.id}>
                    <PastEventCard event={e} />
                  </div>
                ))}
              </div>

              <button className="slider-arrow right" onClick={scrollRight}>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}