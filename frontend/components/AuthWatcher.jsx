import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthWatcher = () => {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (!token || !tokenExpiry) return;

    const remainingTime = tokenExpiry - Date.now();

    const logout = () => {
      if (hasLoggedOut.current) return;
      hasLoggedOut.current = true;

      localStorage.clear();
      alert("Session expired. Please login again.");
      navigate("/account/login", { replace: true });
    };

    if (remainingTime <= 0) {
      logout();
    } else {
      const timer = setTimeout(logout, remainingTime);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return null;
};

export default AuthWatcher;
