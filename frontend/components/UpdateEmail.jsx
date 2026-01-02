import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateEmail = () => {
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-email",
        { oldEmail, newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);
      setOldEmail("");
      setNewEmail("");
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Update Email</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Old Email"
          value={oldEmail}
          onChange={(e) => setOldEmail(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />

        <button type="submit">Update Email</button>
      </form>
    </div>
  );
};

export default UpdateEmail;
