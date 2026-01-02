import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateUsername = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    alert("Please Logout after the Username is changed");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-username",
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);
      setUsername("");
      setShowLogout(true);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/account/login");
  };

  return (
    <div className="auth-container">
      <h2>Update Username</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type="submit">Update Username</button>
      </form>

      {/* ✅ Show Logout button after success */}
      {showLogout && (
        <button
          onClick={handleLogout}
          style={{
            marginTop: "10px",
            width: "100%",
            background: "red",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default UpdateUsername;
