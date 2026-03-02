import { NavLink } from "react-router-dom";
import "./Landingpg.css";
import Navbar from "./Navbar.js";
import HeroCarousel from "./HeroCarousel.js";
import Vission from "./Vission.js";
import Mentors from "./Mentors.js";
import MarqueeComponent from "./MarqueeComponent.js";
import Footer from "./Footer.js";
import Event from "./Event.js";
import Uevents from "./Uevents.js";

export default function Landingpg() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <MarqueeComponent />
      <Vission />
      <Uevents />
      <Mentors />
      <Footer />
    </>
  );
}