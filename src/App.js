// App.js
import React from "react";
import "./App.css"; 
import { Routes, Route, Link } from "react-router-dom";
import Landingpg from "./components/Landingpg.js";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js"
import Event from "./components/Event.js";
import Team from "./components/Team.js";
import Facilities from "./components/Facilities.js";
import { ReactLenis, useLenis } from 'lenis/react'
import Vission from "./components/Vission.js";
import Projects from "./components/Projects.js";
function App() {
  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis)
  })
  return (
  <ReactLenis root >
    <div className="App">
      
       <Routes>
        <Route path="/" element={<Landingpg />} />
        <Route path="/event" element={<Event />} />
         <Route path="/team" element={<Team />} />
         <Route path="/facilities" element ={<Facilities />} /> 
         <Route path="/vission" element ={<Vission />} /> 
         <Route path="/projects" element ={<Projects />} /> 
        
      </Routes>
     
    </div>
     </ReactLenis>
  );
}

export default App;
