import { useEffect, useRef, useState } from "react";
import "./Projects.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

const SHEET_ID = "18ITb2H7qWE7YsvnIXqeJ05q4iY47JhtK4_Ehz9micP4";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=0`;

export default function Projects() {
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();

        const json = JSON.parse(text.substring(47, text.length - 2));
        const rows = json?.table?.rows || [];

        const sheetData = rows
          .slice(1)
          .filter(row => row.c && row.c.some(cell => cell?.v))
          .map((row, i) => {
            const get = (index) =>
              row.c?.[index]?.v?.toString().trim() || "";

            return {
              id: i,
              title: get(0),
              mentor: get(1),
              team: get(2),
              problem: get(3),
              components: get(4)
                ? get(4).split(",").map(c => c.trim())
                : [],
              outcome: get(5),
              image: get(6),
              thumb: get(7)
            };
          })
          .filter(p => p.title && p.problem && p.image);

        setProjects(sheetData);
        setActive(0);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const slideWidth = slider.offsetWidth;
      const index = Math.round(slider.scrollLeft / slideWidth);
      setActive(index);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [projects]);

  const scrollTo = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slideWidth = slider.offsetWidth;

    slider.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Navbar />

      <section className="ps-hero">
        {loading ? (
          <div className="ps-loading">Loading Projects...</div>
        ) : projects.length === 0 ? (
          <div className="ps-loading">No Valid Projects Found</div>
        ) : (
          <>
            <div className="ps-slides" ref={sliderRef}>
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="ps-slide"
                  style={{ backgroundImage: `url(${p.image})` }}
                >
                  <div className="ps-overlay" />

                  <div className="ps-content">
                    <span className="ps-label">IDEALAB PROJECT</span>

                    <h1 className="ps-title">{p.title}</h1>

                    <p className="ps-problem">{p.problem}</p>

                    <div className="ps-meta">
                      <span><strong>Mentor:</strong> {p.mentor}</span>
                      <span><strong>Team:</strong> {p.team}</span>
                    </div>

                    {p.components.length > 0 && (
                      <div className="ps-components">
                        {p.components.map((c, idx) => (
                          <span key={idx} className="ps-chip">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {p.outcome && (
                      <p className="ps-outcome">
                        <strong>Outcome:</strong> {p.outcome}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="ps-thumbs">
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  className={`ps-thumb ${active === i ? "active" : ""}`}
                  onClick={() => scrollTo(i)}
                >
                  <img src={p.thumb || p.image} alt={p.title} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}