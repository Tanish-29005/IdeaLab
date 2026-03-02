import React, { useState } from "react";
import Navbar from "./Navbar.js";
import "./Contact.css";
import Footer from "./Footer.js";
import {
  Phone,
  Mail,
  MapPin,
  Copy,
  CheckCircle2,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUpRight
} from "lucide-react";

export default function Contact() {
  const [copiedItem, setCopiedItem] = useState(null);

  const handleCopy = (text, id) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      setCopiedItem(id);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }

    document.body.removeChild(textArea);
  };

  return (
    <>
      <Navbar />

      <div className="contact-page">
        <header className="header-section">
          <span className="eyebrow">Get in touch</span>
          <h1 className="page-title">
            Let's start a <br />
            <span className="title-italic">conversation.</span>
          </h1>
          <p className="page-subtitle">
            Whether you have a question about our events, want to partner with us,
            or simply want to connect—we'd love to hear from you.
          </p>
        </header>

        <div className="bento-grid">

          <div
            className="contact-card card-email"
            onClick={() => handleCopy("idealab@sakec.ac.in", "email")}
          >
            <div className="card-icon-wrapper">
              <Mail size={22} />
            </div>

            <div>
              <div className="card-label">Official Email</div>
              <div className="card-value">idealab@sakec.ac.in</div>
            </div>

            <button className="card-action">
              {copiedItem === "email" ? (
                <>
                  <CheckCircle2 size={18} /> Copied
                </>
              ) : (
                <>
                  <Copy size={18} /> Copy Email
                </>
              )}
            </button>
          </div>

          <div
            className="contact-card card-phone"
            onClick={() =>
              handleCopy("022-25580854 / 09136400555", "phone")
            }
          >
            <div className="card-icon-wrapper">
              <Phone size={22} />
            </div>

            <div>
              <div className="card-label">Call Us</div>
              <div className="card-value">
                022-25580854 / 09136400555
              </div>
            </div>

            <button className="card-action">
              {copiedItem === "phone" ? (
                <>
                  <CheckCircle2 size={18} /> Copied
                </>
              ) : (
                <>
                  <Copy size={18} /> Copy Number
                </>
              )}
            </button>
          </div>

          <div className="contact-card card-location">
            <div className="card-icon-wrapper">
              <MapPin size={22} />
            </div>

            <div>
              <div className="card-label">Visit Us</div>
              <div className="card-value">
                Shah & Anchor Kutchhi Engineering College
              </div>

              <div className="location-details">
                Mahavir Education Trust Chowk,<br />
                Chembur, Mumbai – 400071
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/2WX5%2BX96,+Ghatla,+Chembur,+Mumbai,+Maharashtra+400071/@19.0485116,72.9090082,17z/data=!4m14!1m7!3m6!1s0x3be7c5f39a7d77d1:0x9ebbdeaea9ec24ae!2sShah+%26+Anchor+Kutchhi+Engineering+College!8m2!3d19.0485065!4d72.9115831!16zL20vMGN5eDJq!3m5!1s0x3be7c605a519c28b:0xdbcc3c34a7ebc8df!8m2!3d19.0500171!4d72.9084976!16s%2Fg%2F11l5gylg7s?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="card-action"
              style={{ textDecoration: "none", marginTop: "2rem" }}
            >
              Get Directions <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="contact-card card-social">
            <div className="card-label" style={{ marginBottom: "1.5rem" }}>
              Social & Links
            </div>

            <div className="social-list">

              <a
                href="https://www.instagram.com/sakec_idealab?igsh=bjc2MGR2MXQ1MWdi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <div className="social-link-left">
                  <Instagram size={20} />
                  <span>@sakec_idealab</span>
                </div>
                <ArrowUpRight size={18} />
              </a>

              <a
                href="https://www.sakec.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <div className="social-link-left">
                  🌐 <span>www.shahandanchor.com</span>
                </div>
                <ArrowUpRight size={18} />
              </a>

              <a href="https://www.linkedin.com/school/sakec/" className="social-link">
                <div className="social-link-left">
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight size={18} />
              </a>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}