import React, { useState } from "react";
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

  if (!username) {
    return (
      <div className="profile-container">
        <h1>Please Login to see your Profile</h1>
      </div>
    );
  }

  const handleDelete = () => {
    const choice = confirm("Are you sure you want to Delete your Account?");

    if (choice) {
      axios
        .delete(`${import.meta.env.VITE_APP_API_URL}/api/auth/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.clear(res.data.token);
          alert("Account Deleted");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setError(err.response?.data?.message || "Something went wrong");
        });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>
          Hello, <span>{username}</span> 👋
        </h1>
        <p>Manage your account details</p>
      </div>

      <div className="profile-card">
        {/* 👇 GRID START */}
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
            <p>View your past and current orders</p>
            <button onClick={() => navigate("/orders")}>
              View Your Orders
            </button>
          </div>
        </div>
        {/* 👆 GRID END */}

        {/* Actions */}
        <div className="profile-actions">
          <button
            className="logout"
            onClick={() => {
              const choice = confirm("Are you sure you want to Logout?");
              if (choice) {
                localStorage.clear();
                navigate("/account/login");
              }
            }}
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
