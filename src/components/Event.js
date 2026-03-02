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

const extractFileId = (url) => {
  if (!url || typeof url !== 'string' || !url.includes("drive.google.com")) return null;
  
  // Extract file ID from /file/d/{fileId}/
  const fileMatch = url.match(/\/file\/d\/([^\/\?]+)/);
  if (fileMatch) return fileMatch[1];
  
  // Extract from ?id={fileId}
  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch) return idMatch[1];
  
  // Extract from open?id={fileId}
  const openMatch = url.match(/open\?id=([^&]+)/);
  if (openMatch) return openMatch[1];
  
  return null;
};

const convertDriveLink = (url) => {
  if (!url || typeof url !== 'string') return "";
  
  const fileId = extractFileId(url);
  if (fileId) {
    // Return the primary URL format
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  
  return url;
};

const EventCard = ({ event }) => {
  const [imgSrc, setImgSrc] = useState(event.image || "");
  const [loading, setLoading] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);
  const attemptedUrls = useRef(new Set());

  const tryAlternativeUrl = (currentUrl) => {
    if (!currentUrl || typeof currentUrl !== 'string') return null;
    
    const fileId = extractFileId(currentUrl);
    if (!fileId) return null;

    // List of alternative URL formats to try
    const alternatives = [
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      `https://lh3.googleusercontent.com/d/${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      `https://docs.google.com/uc?export=download&id=${fileId}`,
    ];

    // Find the first alternative that hasn't been tried yet
    for (const altUrl of alternatives) {
      if (!attemptedUrls.current.has(altUrl)) {
        attemptedUrls.current.add(altUrl);
        return altUrl;
      }
    }
    
    return null;
  };

  const handleImageError = () => {
    console.log(`Image failed (attempt ${attemptCount + 1}):`, imgSrc);
    
    const nextUrl = tryAlternativeUrl(imgSrc);
    
    if (nextUrl && attemptCount < 5) {
      console.log(`Trying alternative URL:`, nextUrl);
      setAttemptCount(attemptCount + 1);
      setImgSrc(nextUrl);
    } else {
      console.log("All attempts failed, using fallback");
      setLoading(false);
      setImgSrc("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800");
    }
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully:", imgSrc);
    setLoading(false);
  };

  useEffect(() => {
    // Reset when event changes
    setLoading(true);
    setAttemptCount(0);
    const initialImg = event.image || "";
    attemptedUrls.current = new Set([initialImg]);
    setImgSrc(initialImg);
  }, [event.image]);

  return (
    <div className="event-card">
      <div className="card-media">
        {loading && <div className="image-loader"></div>}
        <img 
          src={imgSrc || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
          alt={event.title}
          style={{ display: loading ? 'none' : 'block' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
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
};

const PastEventCard = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);
  const attemptedUrls = useRef(new Set());
  
  // If no carousel images, use the main event image
  const carouselImages = event.images && event.images.length > 0 
    ? event.images.filter(img => img && typeof img === 'string')
    : [event.image].filter(Boolean);
  
  console.log("Carousel images for", event.title, ":", carouselImages);

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

  const handleCarouselError = () => {
    console.log(`Carousel image failed (attempt ${attemptCount + 1}):`, imgSrc);
    
    const nextUrl = tryAlternativeUrl(imgSrc);
    
    if (nextUrl && attemptCount < 5) {
      console.log(`Trying alternative carousel URL:`, nextUrl);
      setAttemptCount(attemptCount + 1);
      setImgSrc(nextUrl);
    } else {
      console.log("All carousel attempts failed, using fallback");
      setLoading(false);
      setImgSrc("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800");
    }
  };

  const handleCarouselLoad = () => {
    console.log("Carousel image loaded successfully:", imgSrc);
    setLoading(false);
  };

  useEffect(() => {
    // Reset when image index changes
    if (carouselImages.length > 0) {
      setLoading(true);
      setAttemptCount(0);
      const initialImg = carouselImages[currentImageIndex] || "";
      attemptedUrls.current = new Set([initialImg]);
      setImgSrc(initialImg);
    }
  }, [currentImageIndex, carouselImages.length]);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + carouselImages.length) % carouselImages.length);
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

        {carouselImages.length > 0 && (
          <div className="carousel-container">
            {loading && <div className="image-loader"></div>}
            <img
              src={imgSrc || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
              alt=""
              className="carousel-image"
              style={{ display: loading ? 'none' : 'block' }}
              onLoad={handleCarouselLoad}
              onError={handleCarouselError}
            />

            {carouselImages.length > 1 && (
              <>
                <button className="carousel-btn prev" onClick={prevImage}>
                  <ChevronLeft size={20} />
                </button>

                <button className="carousel-btn next" onClick={nextImage}>
                  <ChevronRight size={20} />
                </button>

                <div className="carousel-indicators">
                  {carouselImages.map((_, idx) => (
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

        const data = rows.map((row, i) => {
          const imageUrl = row.c?.[6]?.v || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800";
          const convertedImage = convertDriveLink(imageUrl);
          
          console.log(`Event ${i}:`);
          console.log("  Original:", imageUrl);
          console.log("  Converted:", convertedImage);
          console.log("  File ID:", extractFileId(imageUrl));
          
          // Parse multiple images for past events (column 10)
          const imagesString = row.c?.[9]?.v || "";
          const parsedImages = imagesString
            ? imagesString.split(",").map(i => convertDriveLink(i.trim())).filter(Boolean)
            : [];
          
          console.log("  Past event images:", parsedImages);
          
          return {
            id: i,
            title: row.c?.[0]?.v || "",
            date: row.c?.[1]?.f || "",
            time: row.c?.[2]?.v || "",
            location: row.c?.[3]?.v || "",
            description: row.c?.[4]?.v || "",
            category: row.c?.[5]?.v || "Event",
            image: convertedImage,
            registrationLink: row.c?.[7]?.v || "#",
            impact: row.c?.[8]?.v || "",
            images: parsedImages
          };
        });

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