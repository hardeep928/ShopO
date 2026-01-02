import React from "react";
import "../css/About.css";
import logo from "../src/assets/erasebg-transformed.png";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-card">
        <img src={logo} alt="ShopO Logo" className="about-logo" />

        <h1>About ShopO</h1>

        <p>
          ShopO is a modern e-commerce platform designed to make online shopping
          simple, fast, and enjoyable. We bring quality products, clean design,
          and smooth user experience together in one place.
        </p>

        <p className="tagline">Smart Shopping. Better Living.</p>

        <button
          className="start-shopping-btn"
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default About;
