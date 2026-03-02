import React, { useEffect, useState } from "react";
import { Linkedin, Github, Twitter, ShieldCheck } from "lucide-react";
import "./Team.css";
import Navbar from "./Navbar.js";
import Mentors from "./Mentors.js";
import Footer from "./Footer.js";

const SHEET_ID = "1rq3F5zwBw7Aw6yrAv9qPr0ALzOGuJ4p-4h-q9Z_VPXA";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=0`;

const MemberCard = ({ member, compact = false }) => (
  <div className={`team-card ${compact ? "compact" : ""}`}>
    <div className="team-card-image">
      <img
        src={member.image}
        alt={member.name}
        onError={(e) => (e.target.src = "/placeholder.png")}
      />
    </div>

    <div className="team-card-body">
      <h3 className="team-name">{member.name}</h3>
      <p className="team-role">{member.role}</p>

      {!compact && <p className="team-bio">{member.bio}</p>}

      <div className="team-socials">
        {member.linkedin && <a href={member.linkedin}><Linkedin size={16} /></a>}
        {member.twitter && <a href={member.twitter}><Twitter size={16} /></a>}
        {member.github && <a href={member.github}><Github size={16} /></a>}
      </div>
    </div>
  </div>
);

export default function Team() {
  const [leadership, setLeadership] = useState([]);
  const [departments, setDepartments] = useState({});
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(SHEET_URL);
      const text = await res.text();
      const json = JSON.parse(text.substring(47, text.length - 2));
      const rows = json.table.rows || [];

      const deptMap = {};
      const leaders = [];

      rows.forEach((row) => {
        const department = row.c?.[2]?.v;
        if (!department || department.toLowerCase() === "department") return;

        const member = {
          name: row.c?.[0]?.v || "",
          role: row.c?.[1]?.v || "",
          department,
          bio: row.c?.[3]?.v || "",
          image: row.c?.[4]?.v || "/placeholder.png",
          linkedin: row.c?.[5]?.v || "",
          twitter: row.c?.[6]?.v || "",
          github: row.c?.[7]?.v || ""
        };

        if (department === "Leadership") {
          leaders.push(member);
        } else {
          if (!deptMap[department]) deptMap[department] = [];
          deptMap[department].push(member);
        }
      });

      setLeadership(leaders);
      setDepartments(deptMap);
      setActiveTab(Object.keys(deptMap)[0]);
    };

    fetchTeam();
  }, []);

  return (
    <>
      <Navbar />
      <Mentors />
      <div className="team-page">
        <div className="team-wrapper">

          {/* 🔒 LAB ADMIN (CENTERED) */}
          {leadership.length > 0 && (
            <section className="leadership-section">
              <div className="team-header">
                <div className="team-badge">
                  <ShieldCheck size={14} /> Leadership
                </div>
                <h2 className="team-title">Lab Admin</h2>
              </div>

              <div className="leadership-grid single">
                {leadership.map((m, i) => (
                  <MemberCard key={i} member={m} compact />
                ))}
              </div>
            </section>
          )}

          {/* 🧭 DEPARTMENTS */}
          <section className="departments-section">
            <div className="team-header">
              <h2 className="team-title">Our Team</h2>
            </div>

            <div className="team-tabs">
              {Object.keys(departments).map((dep) => (
                <button
                  key={dep}
                  className={`team-tab ${activeTab === dep ? "active" : ""}`}
                  onClick={() => setActiveTab(dep)}
                >
                  {dep}
                </button>
              ))}
            </div>

            <div className="team-grid">
              {departments[activeTab]?.map((m, i) => (
                <MemberCard key={i} member={m} />
              ))}
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </>
  );
}
