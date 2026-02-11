import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Github, 
  Twitter, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import "./Team.css";
import Navbar from './Navbar.js';
import Footer from './Footer.js';

const TEAM_DATA = {
  "Leadership": [
    { 
      id: "admin-1", 
      name: "Dr. Julian Sterling", 
      role: "President of IdeaLab", 
      stats: { technical: 100, creativity: 99 }, 
      bio: "Leading the frontier of collegiate innovation for over a decade. Dr. Sterling oversees the strategic vision and inter-departmental synergy of the lab.", 
      image: "/tanish.png" 
    }
  ],
  "Projects": [
    { id: 1, name: "Alex Rivera", role: "Systems Architect", stats: { technical: 95, creativity: 92 }, bio: "Specializes in neural-network integration and autonomous flight protocols.", image: "/tanish.png" },
    { id: 2, name: "Sarah Chen", role: "AI Strategist", stats: { technical: 82, creativity: 90 }, bio: "Lead researcher on ethical AI implementation and machine vision.", image: "/tanish.png" },
    { id: 3, name: "Marcus Thorne", role: "Hardware Lead", stats: { technical: 88, creativity: 96 }, bio: "Prototyping low-latency IoT hardware for extreme environments.", image: "/tanish.png" },
    { id: 4, name: "Elena Vogt", role: "HMI Specialist", stats: { technical: 75, creativity: 98 }, bio: "Designing immersive human-machine interfaces for deep-sea robotics.", image: "/tanish.png" },
  ],
  "Documentation": [
    { id: 5, name: "Julian Gray", role: "Protocol Lead", stats: { technical: 90, creativity: 70 }, bio: "Standardizing the lab's documentation for open-source scalability.", image: "/tanish.png" },
    { id: 6, name: "Lila Rossi", role: "Archivist", stats: { technical: 70, creativity: 85 }, bio: "Managing the historical data-lakes of the lab's past 100 projects.", image: "/tanish.png" },
  ],
  "Events": [
    { id: 8, name: "Maya Patel", role: "Ops Director", stats: { technical: 60, creativity: 99 }, bio: "Coordinating high-stakes engineering sprints and global hackathons.", image: "/tanish.png" },
    { id: 9, name: "Daniel Smith", role: "Growth lead", stats: { technical: 65, creativity: 88 }, bio: "Connecting student visionaries with industry-leading mentors.", image: "/tanish.png" },
  ],
  "Social Media": [
    { id: 10, name: "Zoe Brooks", role: "Media Strategist", stats: { technical: 50, creativity: 100 }, bio: "Translating complex hardware builds into viral digital stories.", image: "/tanish.png" },
    { id: 11, name: "Liam O'Neill", role: "Content Producer", stats: { technical: 40, creativity: 95 }, bio: "Visualizing lab experiments through high-fidelity cinematography.", image: "/tanish.png" }
  ]
};

const PersonnelCard = ({ member, idx }) => (
  <div className="member-card" style={{ animationDelay: `${idx * 0.05}s` }}>
    <div className="image-container">
      <img src={member.image} className="member-img" alt={member.name} />
      <div className="image-overlay"></div>
    
    </div>

    <div className="card-content">
      <div className="name-group">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
      </div>

      <p className="member-bio">{member.bio}</p>

      <div className="stats-container">
         {Object.entries(member.stats).map(([key, value]) => (
           <div key={key} className="stat-row">
              <div className="stat-dot"></div>
              <div className="stat-info">
                 <div className="stat-labels">
                    <span className="stat-key">{key}</span>
                    <span className="stat-val">{value}%</span>
                 </div>
                 <div className="progress-bg">
                    <div className="progress-fill" style={{ width: `${value}%` }}></div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="social-links">
        <a href="#"><Linkedin size={18} /></a>
        <a href="#"><Twitter size={18} /></a>
        <a href="#"><Github size={18} /></a>
      </div>
    </div>
  </div>
);

export default function Team() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    setSwitching(true);
    const timer = setTimeout(() => setSwitching(false), 400);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <>
    <Navbar />
    <div className="team-page">
      <div className="bg-accents">
        <div className="accent-blob top-left"></div>
        <div className="accent-blob bottom-right"></div>
      </div>

      <div className="content-wrapper">
        <section className="leadership-section">
          <div className="section-header">
            <div className="badge">
              <ShieldCheck size={14} /> Executive Leadership
            </div>
            <h2 className="section-title">Lab <span className="highlight">Admin</span></h2>
          </div>
          <div className="admin-container">
            <PersonnelCard member={TEAM_DATA["Leadership"][0]} idx={0} />
          </div>
        </section>

        <div className="divider"></div>

        <section className="departments-section">
          <div className="section-header">
            <h3 className="section-title">Our <span className="highlight">Departments</span></h3>
            <p className="section-subtitle">Explore specialized teams driving technical excellence.</p>
          </div>

          <div className="tab-navigation">
            {Object.keys(TEAM_DATA).filter(k => k !== "Leadership").map((team) => (
              <button
                key={team}
                onClick={() => setActiveTab(team)}
                className={`tab-btn ${activeTab === team ? 'active' : ''}`}
              >
                {team}
              </button>
            ))}
          </div>

          <div className={`grid-container ${switching ? 'fade-out' : 'fade-in'}`}>
            {TEAM_DATA[activeTab]?.map((member, idx) => (
              <PersonnelCard key={member.id} member={member} idx={idx} />
            ))}
          </div>
        </section>
      </div>

     <Footer />
    </div>
    </>
  );
}