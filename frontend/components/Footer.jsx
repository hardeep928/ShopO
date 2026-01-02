import React from "react";
import "../css/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const token = localStorage.getItem("token");

    if (token) {
      alert("You are already Logged In.");
    } else {
      navigate("/account/login");
    }
  };

  const handleRegister = () => {
    const token = localStorage.getItem("token");

    if (token) {
      alert("You are already Registered.");
    } else {
      navigate("/account/register");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">ShopO</h2>
          <p className="footer-text">
            Your one-stop destination for trendy and affordable fashion.
          </p>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li onClick={() => navigate("/products")}>All Products</li>
            <li onClick={() => navigate("/products")}>New Arrivals</li>
            <li onClick={() => navigate("/products")}>Best Sellers</li>
            <li onClick={() => navigate("/products")}>Offers</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Account</h3>
          <ul>
            <li onClick={handleLogin}>Login</li>
            <li onClick={handleRegister}>Register</li>
            <li onClick={() => navigate("/cart")}>My Cart</li>
            <li onClick={() => navigate("/orders")}>Orders</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShopO. All rights reserved.
          <br /> Made with ❤️ by Hardeep Singh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
