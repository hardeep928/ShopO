import React, { useState } from "react";
import "../css/Account.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleData = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!inputData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(inputData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!inputData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (inputData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setApiError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/login`,
        inputData
      );

      const token = res.data.token;

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = decoded.exp * 1000;

      localStorage.setItem("token", token);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("tokenExpiry", expiryTime);

      navigate("/");
    } catch (err) {
      setApiError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>

      <h5 style={{ color: "red" }}>
        Note-: Please keep remember your Passcode as we don't have Forgot
        Password right now ( :
      </h5>
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            value={inputData.email}
            onChange={handleData}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={inputData.password}
            onChange={handleData}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit">Login with ShopO</button>

        <button type="button" onClick={() => navigate("/account/register")}>
          New User? Register
        </button>
      </form>

      {apiError && <p className="error-text-api">{apiError}</p>}
    </div>
  );
};

export default Login;
