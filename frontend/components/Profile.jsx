import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("username");
  const username = storedUser ? storedUser.split(" ")[0] : null;
  const email = localStorage.getItem("email") || "user@email.com";
  const token = localStorage.getItem("token");

  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const isExpired = tokenExpiry && Date.now() > tokenExpiry;

  const logoutUser = (message = "Session expired. Please login again.") => {
    localStorage.clear();
    alert(message);
    navigate("/account/login");
  };

  if (!username) {
    return (
      <div className="profile-container">
        <h1>Please Login to see your Profile</h1>
      </div>
    );
  }

  const handleDelete = async () => {
    const choice = confirm("Are you sure you want to delete your account?");
    if (!choice) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();
      alert("Account deleted successfully");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>
          Hello, <span>{username}</span> 👋
        </h1>
        <p>Manage your account details</p>
        {isExpired ? (
          <p className="error-text">⚠ Session expired</p>
        ) : (
          <p className="success-text">✅ Session active</p>
        )}
      </div>

      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-item">
            <h3>👤 Username</h3>
            <p>{storedUser}</p>
            <button onClick={() => navigate("/change-username")}>
              Change Username
            </button>
          </div>

          <div className="profile-item">
            <h3>📧 Email</h3>
            <p>{email}</p>
            <button onClick={() => navigate("/change-email")}>
              Change Email
            </button>
          </div>

          <div className="profile-item">
            <h3>🔒 Password</h3>
            <p>********</p>
            <button onClick={() => navigate("/change-password")}>
              Change Password
            </button>
          </div>

          <div className="profile-item">
            <h3>📦 Orders</h3>
            <button onClick={() => navigate("/orders")}>
              View Your Orders
            </button>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="logout"
            onClick={() => logoutUser("Logged out successfully")}
          >
            Logout
          </button>

          <button className="delete" onClick={handleDelete}>
            Delete Account
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
