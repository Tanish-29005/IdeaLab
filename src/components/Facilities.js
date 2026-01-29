import React, { useLayoutEffect, useRef } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Facilities.css";
import Navbar from "./Navbar.js";
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const machinesData = [
  {
    id: "crm4",
    name: "Creality CR-M4",
    tagline: "Industrial Titan",
    // Image Path 1
    image: "/CRMnobg.png", 
    desc: "A massive 450mm³ build volume for industrial-scale prototyping.",
    specs: ["450x450x470mm", "Direct Drive", "300°C Temp"],
    theme: "amber",
  },
  {
    id: "ender5",
    name: "Ender-5 S1",
    tagline: "High-Speed Demon",
    // Image Path 2
    image: "/Ender (2).png", 
    desc: "Prints at a blazing 250mm/s. Built for speed and structural rigidity.",
    specs: ["250mm/s Speed", "Cube Frame", "Auto-Leveling"],
    theme: "neon-green",
  },
  {
    id: "laser",
    name: "SIL Laser Cutter",
    tagline: "Precision Beam",
    // Image Path 3
    image: "/Laser (2).png", 
    desc: "100W CO2 Laser power capable of slicing through acrylic and wood.",
    specs: ["100W Laser Tube", "600x900mm Bed", "Water Cooled"],
    theme: "red-glow",
  },
  {
    id: "roland",
    name: "Roland SRM-20",
    tagline: "PCB Architect",
    // Image Path 4
    image: "/Srm20 (2).png", 
    desc: "Sub-millimeter precision for milling custom circuit boards.",
    specs: ["7000 RPM Spindle", "0.1mm Accuracy", "PCB/Wax Milling"],
    theme: "blue-tech",
  }
];

// Duplicate data to create the "Infinite" feel
const machines = [...machinesData, ...machinesData];

export default function Facilities() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const sections = gsap.utils.toArray(".machine-section");
      
      // 1. HERO ANIMATION
      gsap.fromTo(".fac-hero-title span", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );

      // 2. MAIN TIMELINE
      const totalScroll = sections.length * 100; // Scroll distance percentage
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: `+=${totalScroll}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1, 
        }
      });

      sections.forEach((section, i) => {
        // --- SELECTORS ---
        const img = section.querySelector(".machine-img");
        const content = section.querySelector(".content-overlay");
        const bgGrid = section.querySelector(".bg-grid");
        const lines = section.querySelectorAll(".speed-line");
        const path = section.querySelector(".laser-path");
        const scanner = section.querySelector(".scan-line");

        // --- ANIMATION LOGIC ---
        // If it's NOT the first section, it needs to fade IN.
        if (i > 0) {
          // Overlap: Start appearing before the previous one finishes
          tl.to(section, { autoAlpha: 1, duration: 0.5 }, "-=0.25");
        }

        // --- INTERNAL ANIMATIONS ---
        
        // 1. ZOOM (Amber Theme)
        if (section.classList.contains("theme-amber")) {
          tl.fromTo(img, { scale: 0.8, y: 50 }, { scale: 2, y: 0, duration: 2, ease: "none" }, "<");
          if(bgGrid) tl.to(bgGrid, { scale: 2, opacity: 0, duration: 2 }, "<");
          tl.fromTo(content, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.5");
        }
        
        // 2. SPEED (Neon Theme)
        else if (section.classList.contains("theme-neon-green")) {
          tl.fromTo(img, { x: 300, skewX: -10, opacity: 0 }, { x: 0, skewX: 0, opacity: 1, duration: 1 }, "<");
          if(lines.length) tl.fromTo(lines, { x: "100%" }, { x: "-100%", duration: 1.5, stagger: 0.1 }, "<");
          tl.fromTo(content, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "<0.5");
        }

        // 3. LASER (Red Theme) - *** FIXED HERE ***
        else if (section.classList.contains("theme-red-glow")) {
          if(path) {
            // FIX: We must set strokeDasharray AND offset for the "draw" effect to work
            tl.fromTo(path, 
              { strokeDasharray: 2000, strokeDashoffset: 2000 }, 
              { strokeDashoffset: 0, duration: 1.5 }, 
              "<"
            );
          }
          tl.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 1 }, "<0.5");
          tl.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1 }, "<");
        }

        // 4. SCANNER (Blue Theme)
        else if (section.classList.contains("theme-blue-tech")) {
          if(scanner) tl.fromTo(scanner, { top: "0%" }, { top: "100%", duration: 2 }, "<");
          tl.fromTo(img, { filter: "grayscale(100%) brightness(0.5)" }, { filter: "grayscale(0%) brightness(1)", duration: 2 }, "<");
          tl.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1 }, "<0.5");
        }

        // --- EXIT ANIMATION ---
        if (i < sections.length - 1) {
          tl.to(section, { autoAlpha: 0, duration: 0.5 }, "+=0.5");
        }
      });

    }, containerRef); 

    return () => ctx.revert(); 
  }, []);

  return (

    <ReactLenis root>
        <Navbar />
      <div className="facilities-wrapper" ref={containerRef}>
        
        {/* HERO */}
        <section className="fac-hero">
          <h1 className="fac-hero-title">
            <span>THE</span> <span>ARSENAL</span>
          </h1>
          <p>Engineering Grade Equipment.</p>
        </section>

        {/* PINNED STAGE */}
        <div className="machines-stage" ref={stageRef}>
          {machines.map((machine, index) => (
            <div 
              key={`${machine.id}-${index}`} 
              className={`machine-section theme-${machine.theme}`}
            >
              <div className="machine-container">
                
                {/* --- BACKGROUND FX --- */}
                {machine.theme === "amber" && <div className="bg-grid"></div>}
                {machine.theme === "neon-green" && (
                   <div className="speed-lines-container">
                      <div className="speed-line" style={{top: "20%"}}></div>
                      <div className="speed-line" style={{top: "50%"}}></div>
                      <div className="speed-line" style={{top: "80%"}}></div>
                   </div>
                )}
                {machine.theme === "red-glow" && (
                  <svg className="laser-svg" viewBox="0 0 600 400">
                    <rect className="laser-path" x="10" y="10" width="580" height="380" rx="20" />
                  </svg>
                )}
                {machine.theme === "blue-tech" && <div className="scan-line"></div>}

                {/* --- CONTENT --- */}
                <div className="img-wrapper">
                  <img src={machine.image} alt={machine.name} className="machine-img" />
                </div>
                
                <div className="content-overlay">
                  <div className="machine-info">
                    <span className="machine-tagline">{machine.tagline}</span>
                    <h2>{machine.name}</h2>
                    <p>{machine.desc}</p>
                  </div>
                  <div className="machine-specs">
                    <h3>Specs</h3>
                    <ul>
                      {machine.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </ReactLenis>
  );
}