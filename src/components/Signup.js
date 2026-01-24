import React, { useState } from "react";
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");

  const validation = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.password ||
      !formData.confirmpassword
    ) {
      setError("All fields are required");
      return false;
    }
    if (formData.password !== formData.confirmpassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError(
        "Please enter a valid phone number in international format (e.g., +1234567890)"
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      alert("Form submitted successfully!");
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="signup-container">
      <div className="Title">
        <img
          src="/uploads/Screenshot_2025-09-05_002026-removebg-preview.png"
          className="logo"
          alt="logo"
        />
        <h1 className="brand-name">IdeaLab</h1>
      </div>

      <h4 className="signup-heading">Sign Up</h4>

      {error && <p className="error-message">{error}</p>}

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="tel"
            name="phone"
            placeholder="Enter phone number "
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="text"
            name="department"
            placeholder="Enter your Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}
