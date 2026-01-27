import "./Team.css"
import Navbar from "./Navbar.js"

export default function Team() {
    return(
        <>
        <Navbar />
        <div className="Team-hero">
           
           <h1><b>The Council</b></h1>
           <h5>Driving innovation at Idea Lab SAKEC.</h5>
        </div>
        <div>
           <h2 className="captain"><b>The Captain</b></h2>
            <div className="Admin-card Admin-orange">
          <img src="" alt="Admin" className="mentor-img" />
          <h5 className="Admin-name">Krishita Ravat</h5>
          <span className="Admin-role">Admin</span>
          <p>
            "Leading the vision of Idea Lab with passion and innovation."
          </p>
        </div>
        </div>
        <div className="team-btn">
            <button ><b>Events</b></button>
            <button><b>Projects</b></button>
            <button><b>Social Media</b></button>
            <button><b>Finanace</b></button>
            <button><b>Documentation</b></button>
        </div>
        </>
    )
}