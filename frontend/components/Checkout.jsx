import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Checkout.css";
import Logo from "../src/assets/erasebg-transformed.png";
import axios from "axios";
import PaymentSuccessful from "./PaymentSuccessful";

const Checkout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [subtotal, setSubtotal] = useState(0);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };

  const validateData = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    if (!formData.state.trim()) {
      errors.state = "State is required";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateData();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/orders/place`,
        {
          shippingInfo: {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            phone: formData.phone,
          },
          paymentMethod: formData.paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/payment-success");

      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    } catch (err) {
      console.log(err);
      alert("Failed to Place Order. Please try again.");
    }
  };

  const fetchCartInfo = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/cart/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cartItems = res.data.items;
      // console.log(cartItems);
      let calculatedSubtotal = 0;

      cartItems.forEach((item) => {
        calculatedSubtotal += item.price * item.quantity;
      });

      setSubtotal(Number(calculatedSubtotal.toFixed(2)));

      // console.log("Updated Subtotal:", calculatedSubtotal);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchCartInfo();
  }, []);

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <img src={Logo} alt="ShopO Logo" className="checkout-logo" />
        <h2>Checkout</h2>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping Details</h3>
          {errors.name && <p className="error-text">{errors.name}</p>}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.email && <p className="error-text">{errors.email}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.address && <p className="error-text">{errors.address}</p>}
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
          />

          <div className="row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <p className="error-text">{errors.state}</p>}
          </div>
          <div className="row">
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
            {errors.pincode && <p className="error-text">{errors.pincode}</p>}

            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          <h3>Payment Method</h3>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handlePaymentChange}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handlePaymentChange}
              />
              Debit / Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="emi"
                checked={formData.paymentMethod === "emi"}
                onChange={handlePaymentChange}
              />
              EMI
            </label>
          </div>

          {formData.paymentMethod === "card" && (
            <div className="card-box">
              <input type="text" placeholder="Card Number" maxLength="16" />
              <div className="row">
                <input type="text" placeholder="MM / YY" />
                <input type="password" placeholder="CVV" maxLength="3" />
              </div>
              <input type="text" placeholder="Name on Card" />
            </div>
          )}

          {formData.paymentMethod === "emi" && (
            <div className="emi-box">
              <select>
                <option>Select Bank</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>SBI</option>
                <option>Axis Bank</option>
              </select>
              <select>
                <option>Select EMI Duration</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>9 Months</option>
                <option>12 Months</option>
              </select>
            </div>
          )}

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>

      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <hr />
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <button className="back-btn" onClick={() => navigate("/cart")}>
          Back to Cart
        </button>
        <button className="cancel-btn" onClick={() => navigate("/")}>
          Cancel Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
