import "./Facilities.css";
import Navbar from "./Navbar.js";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Footer from "./Footer.js";

const equipments = [
{
  title: "Benq Smart Board",
  description: "Interactive smart classroom display with multi-touch support and wireless screen sharing.",
  specs: "Power: 220–300W | Education Display",
  img: "./Benq Smart Board.png",
  glow: "#3b82f6",
  scale: 1.5,
},
{
  title: "100W Acrylic Laser Cutter",
  description: "Precision laser cutting and engraving machine for acrylic, wood, leather, and more.",
  specs: "Working Area: 600×900 mm | 100W CO₂ Laser",
  img: "./Laser (2).png",
  glow: "#ef4444",
  scale: 1.5,
},
{
  title: "Creality CR-M4 3D Printer",
  description: "Large-format FDM 3D printer with 450×450×470mm build volume.",
  specs: "Print Volume: 450×450×470 mm | FDM",
  img: "./CRMnobg.png",
  glow: "#f59e0b",
  scale: 1.5,
},
{
  title: "Creality Ender 5 S1",
  description: "High-speed FDM 3D printer with auto bed leveling.",
  specs: "Speed: 250 mm/s | Auto Leveling",
  img: "./Ender (2).png",
  glow: "#10b981",
  scale: 1.5,
},
{
  title: "Adventurer 5M Pro (Flashforge)",
  description: "Fully enclosed high-speed 3D printer with Wi-Fi.",
  specs: "Speed: 600 mm/s | Enclosed FDM",
  img: "./flash forge.png",
  glow: "#6366f1",
  scale: 1.5,
},
{
  title: "Desktop CNC SRM-20",
  description: "Compact precision milling machine for PCB fabrication.",
  specs: "PCB | Acrylic | Nylon | Milling",
  img: "./Srm20 (2).png",
  glow: "#ec4899",
  scale: 1.5,
},
{
  title: "Ferm Bench Sander",
  description: "350W bench sander for shaping and finishing.",
  specs: "350W | Belt & Disc Sanding",
  img: "./bench sander.png",
  glow: "#f97316",
  scale: 1.5,
},
{
  title: "Ferm Scroll Saw",
  description: "Precision scroll saw for intricate curved cuts.",
  specs: "120W | Adjustable Table",
  img: "./Ferm scroll saw.png",
  glow: "#14b8a6",
  scale: 1.5,
},
{
  title: "200mm Bandsaw",
  description: "Heavy-duty bandsaw for straight and curved cutting.",
  specs: "1000W | 2-Speed | 200mm Cut Height",
  img: "./Bandsaw.png",
  glow: "#eab308",
  scale: 1.5,
}
];

export default function Facilities() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalScrollable = (equipments.length - 1) * viewportHeight;

      const rawProgress =
        (scrolled / totalScrollable) * (equipments.length - 1);

      setProgress(
        Math.min(equipments.length - 1, Math.max(0, rawProgress))
      );
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = Math.round(progress);
  const localProgress = progress - activeIndex;

  const spacing = isMobile ? 150 : 260;
  const baseOffset = isMobile ? -60 : -160;

  const glowX = -120 + localProgress * 80;
  const glowY = -50 + Math.sin(localProgress * Math.PI) * 8;

  return (
    <>
      <Navbar />
      <div style={{ height: `${equipments.length * 100}vh` }} />

      <section className="facility-hero fixed">

        <div
          className="bg-blob"
          style={{
            transform: `translate(${glowX}px, calc(-50% + ${glowY}px))`,
            background: `radial-gradient(circle at 50% 50%,
              ${equipments[activeIndex]?.glow}aa 0%,
              ${equipments[activeIndex]?.glow}55 35%,
              ${equipments[activeIndex]?.glow}22 60%,
              transparent 85%)`,
          }}
        />

        <div className="facility-text">
          <div key={activeIndex} className="text-stack">
            <h1>{equipments[activeIndex]?.title}</h1>
            <p>{equipments[activeIndex]?.description}</p>
            <small>{equipments[activeIndex]?.specs}</small>
          </div>
        </div>

        <div className="image-strip">
          {equipments.map((item, i) => {
            const offset = i - progress;

            const x = offset * spacing + baseOffset;
            const scaleFactor = 1 - Math.abs(offset) * 0.15;
            const scale = Math.max(0.65, item.scale * scaleFactor);
            const blurAmount = Math.min(20, Math.abs(offset) * 8);
            const opacity = Math.max(0, 1 - Math.abs(offset) * 0.5);
            const y = -50 + Math.abs(offset) * 3;
            const rotateY = isMobile ? 0 : offset * -8;
            const zIndex = 20 - Math.abs(offset) * 2;

            return (
              <img
                key={i}
                src={item.img}
                alt={item.title}
                className="strip-img"
                style={{
                  transform: `translate(${x}px, ${y}%) scale(${scale}) rotateY(${rotateY}deg)`,
                  filter: `blur(${blurAmount}px) brightness(${1 - Math.abs(offset) * 0.1})`,
                  opacity,
                  zIndex,
                }}
              />
            );
          })}
        </div>

      </section>

      <Footer />
    </>
  );
}