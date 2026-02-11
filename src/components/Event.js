import React from 'react';
import "./Event.css";
import Footer from './Footer.js';
import Navbar from './Navbar.js';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Star,
  CheckCircle2
} from 'lucide-react';

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Quantum Innovation Summit 2024",
    date: "Oct 24, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Idealab",
    description: "A flagship conference bringing together industry leaders and student researchers to discuss the future of quantum computing in logistics.",
    category: "Summit",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=600&h=400&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Generative AI Workshop",
    date: "Nov 02, 2025",
    time: "02:00 PM - 05:00 PM",
    location: "Idealab",
    description: "Hands-on session on fine-tuning Large Language Models for specific institutional research datasets.",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Global Sustainability Workshop",
    date: "Dec 12, 2025",
    time: "2:00pm - 3:00pm",
    location: "Idealab",
    description: "Build technical solutions for carbon footprint tracking in urban environments. $5,000 prize pool for winning prototypes.",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&h=400&auto=format&fit=crop"
  }
];

const PAST_EVENTS = [
  {
    id: "p1",
    title: "Robo-Sprint 2023",
    impact: "45 Prototypes Built",
    description: "Our annual robotics competition saw a record turnout with projects ranging from medical assist bots to autonomous harvesters.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&h=300&auto=format&fit=crop"
  },
  {
    id: "p2",
    title: "IoT Expo: Connected Cities",
    impact: "12 Industry Partnerships",
    description: "Showcasing how low-latency sensors can revolutionize traffic management and waste collection.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&h=300&auto=format&fit=crop"
  },
  {
    id: "p3",
    title: "Ethics in Tech Seminar",
    impact: "50+ Attendees",
    description: "A deep dive into the algorithmic biases and the importance of inclusive data sets in modern software.",
    image: "https://images.unsplash.com/photo-1540575861501-7c001173a270?q=80&w=400&h=300&auto=format&fit=crop"
  }
];

const EventCard = ({ event }) => (
  <div className="event-card">
    <div className="card-media">
      <img src={event.image} alt={event.title} className="card-img" />
      <div className="category-badge">
        <span>{event.category}</span>
      </div>
    </div>
    
    <div className="card-body">
      <div className="card-header-info">
        <div className="date-tag">
          <Calendar size={14} />
          {event.date}
        </div>
        <h3 className="card-title">{event.title}</h3>
      </div>
      
      <p className="card-desc">{event.description}</p>
      
      <div className="details-list">
        <div className="detail-item">
          <Clock size={14} /> {event.time}
        </div>
        <div className="detail-item">
          <MapPin size={14} /> {event.location}
        </div>
      </div>
      
      <button className="register-btn">
        Register Now <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

export default function Event() {
  return (
    <>
    <Navbar />
    <div className="events-page">
      <div className="background-glows">
        <div className="glow glow-top"></div>
        <div className="glow glow-bottom"></div>
      </div>

      <div className="events-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-backdrop">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="hero" />
            <div className="hero-overlay"></div>
          </div>
          
          <div className="hero-inner">
            <div className="featured-badge">
              <Star size={14} fill="currentColor" /> Featured Event
            </div>
            <h1 className="hero-title">
              Innovate <span className="title-gradient">Beyond</span> Limits
            </h1>
            <p className="hero-subtitle">
              Join the IdeaLab community for high-stakes hackathons, expert-led workshops, and the most anticipated tech summits of the year.
            </p>
            <div className="hero-actions">
              
              <button className="btn-secondary">
                Our History
              </button>
            </div>
          </div>
        </section>

        {/* Upcoming Events Grid */}
        <section className="upcoming-section">
          <div className="section-top">
            <div className="section-intro">
              <span className="section-label">Schedule // 2024</span>
              <h2 className="section-heading">
                Upcoming <span className="muted">Engagements</span>
              </h2>
            </div>
            <div className="node-stats">
              <p className="stats-label">Active nodes</p>
              <p className="stats-value">03 ACTIVE</p>
            </div>
          </div>

          <div className="events-grid">
            {UPCOMING_EVENTS.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Legacy / Previous Events Section */}
        <section className="legacy-section">
          <div className="container">
            <div className="legacy-grid">
              <div className="legacy-info">
                <div className="info-glow"></div>
                <span className="section-label">Archive // Success Stories</span>
                <h2 className="section-heading legacy-title">
                  The <span className="title-gradient">Legacy</span> Section
                </h2>
                <p className="legacy-desc">
                  IdeaLab isn't just about the future; it's about a consistent track record of innovation. Explore the projects and seminars that defined our last season.
                </p>
                <button className="archive-link">
                  Explore Full Archive 
                  <div className="circle-icon">
                    <ArrowRight size={20} />
                  </div>
                </button>
              </div>

              <div className="legacy-list">
                {PAST_EVENTS.map((past) => (
                  <div key={past.id} className="past-event-item">
                    <div className="past-img-box">
                      <img src={past.image} alt={past.title} />
                    </div>
                    <div className="past-content">
                      <div className="impact-tag">
                        <CheckCircle2 size={12} /> {past.impact}
                      </div>
                      <h4 className="past-title">{past.title}</h4>
                      <p className="past-desc">{past.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Proposal CTA Section */}
        <section className="proposal-section">
          <div className="proposal-box">
            <h3 className="proposal-title">
              Have an <span className="accent">Event</span> Idea?
            </h3>
            <p className="proposal-desc">
              Collaborate with the IdeaLab team to host your own workshop or hackathon. We provide the infrastructure and the audience.
            </p>
            <button className="proposal-btn">
              Submit Proposal
            </button>
          </div>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}