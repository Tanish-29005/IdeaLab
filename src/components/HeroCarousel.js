import "./Landingpg.css";

export default function HeroCarousel() {
  const slides = [
    {
      image: `${process.env.PUBLIC_URL}/idea.png`,
      title: "Innovate. Build. Inspire.",
      desc: "IDEALab SAKEC empowers students to transform ideas into real-world solutions."
    },
    {
      image: `${process.env.PUBLIC_URL}/fab.png`,
      title: "Where Ideas Become Reality",
      desc: "A space for innovation, collaboration, prototyping, and entrepreneurship."
    }
  ];

  return (
    <div className="hero-wrapper">
      <div
        id="heroCarousel"
        className="carousel slide hero-carousel"
        data-bs-ride="carousel"
        data-bs-interval="5000"
        data-bs-pause="false"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
            ></button>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div
                className="carousel-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="carousel-caption-custom">
                  <h2>{slide.title}</h2>
                  <p>{slide.desc}</p>
                  <button className="hero-btn">Explore IDEALab</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}
