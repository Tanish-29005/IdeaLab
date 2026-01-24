import React, { useState } from "react";

export default function Login(){
    const [email,setemail]=useState("");
    const [Password,setPassword]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault()

        if(email.trim() || Password.trim() ==" "){
            alert("All fields are required to be filled");
        }
        localStorage.setItem(email,email);
    }
    return(

        <div  className="signup-container">
            <div className="Title">
        <img
          src="/uploads/Screenshot_2025-09-05_002026-removebg-preview.png"
          className="logo"
          alt="logo"
        />
        <h1 className="brand-name">IdeaLab</h1>
      </div>
            
            <h4 className="signup-heading">Login</h4>
             <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                className="form-input"
                   type="email"
                   name="email"
                   placeholder="Enter Email Address"
                   
                   value={email}
                   onChange={(e)=> {setemail(e.target.value)}}
                   required

                
                />
            </div>
            <div className="form-group">
                <input 
                className="form-input"
                   type="password"
                   name="Password"
                   placeholder="Enter password"
                   value={Password}
                   onChange={(e)=> {setPassword(e.target.value)}}
                   required
                   

                />
            </div>
             <button type="submit" className="submit-btn">
          Login
        </button>
            </form>
            </div>
    );
}