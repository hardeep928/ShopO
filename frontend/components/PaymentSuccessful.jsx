import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessful = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/profile");
    }, 3000);

    // cleanup
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <img
        src="https://user-images.githubusercontent.com/12693087/31615154-9c8c4886-b280-11e7-828d-2f64e4250c53.gif"
        alt="Payment Successful"
        style={styles.img}
      />

      <h2>Payment Successful 🎉</h2>
      <p>Redirecting to Orders in {countdown}...</p>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  img: {
    width: "300px",
    marginBottom: "20px",
  },
};

export default PaymentSuccessful;
