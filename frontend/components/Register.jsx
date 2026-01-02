import React, { useState } from "react";
import "../css/Account.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!inputData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!inputData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(inputData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!inputData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (inputData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/register`,
        inputData
      );
      navigate("/account/login");
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>

      <h5 style={{ color: "red" }}>
        Note-: Please keep remember your Passcode as we don't have Forgot
        Password right now ( :
      </h5>
      <br />

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={inputData.username}
            onChange={handleData}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputData.email}
            onChange={handleData}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputData.password}
            onChange={handleData}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit">Register with ShopO</button>

        <button type="button" onClick={() => navigate("/account/login")}>
          Already a User? Login
        </button>
      </form>

      {apiError && <p className="error-text">{apiError}</p>}
    </div>
  );
};

export default Register;
