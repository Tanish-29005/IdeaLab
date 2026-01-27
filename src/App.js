// App.js
import React from "react";
import "./App.css"; 
import { Routes, Route, Link } from "react-router-dom";
import Landingpg from "./components/Landingpg.js";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js"
import Event from "./components/Event.js";
import Team from "./components/Team.js";
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Landingpg />} />
        <Route path="/event" element={<Event />} />
         <Route path="/team" element={<Team />} />
        
      </Routes>
    </div>
  );
}

export default App;
