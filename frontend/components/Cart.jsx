import React, { useEffect, useState } from "react";
import "../css/Cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState("");

  useEffect(() => {
    const disableToggle = () => {
      if (items.length === 0) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    };

    disableToggle();
  }, [items]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const roundOff = (value) => Number(value.toFixed(2));

  if (!token) {
    return (
      <div className="profile-container">
        <h1>Please Login to Add Items to your Cart</h1>
      </div>
    );
  }

  const safetyCheck = () => {
    if (items.length === 0) {
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const merged = Object.values(
        res.data.items.reduce((acc, item) => {
          if (!acc[item.productId]) {
            acc[item.productId] = { ...item };
          } else {
            acc[item.productId].quantity += item.quantity;
          }
          return acc;
        }, {})
      );

      setItems(merged);
    };

    fetchCart();
  }, [token]);

  useEffect(() => {
    let qty = 0;
    let price = 0;

    items.forEach((item) => {
      qty += item.quantity;
      price += item.quantity * item.price;
    });

    setTotalQty(qty);
    setTotalPrice(roundOff(price));
  }, [items]);

  const updateBackendQty = async (productId, quantity) => {
    await axios.put(
      `${import.meta.env.VITE_APP_API_URL}/api/cart/update`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const increaseQty = async (productId) => {
    const item = items.find((i) => i.productId === productId);
    if (item.quantity >= 10) return;

    // Optimistic UI
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

    try {
      await updateBackendQty(productId, item.quantity + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQty = async (productId) => {
    const item = items.find((i) => i.productId === productId);
    if (item.quantity <= 1) return;

    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
      )
    );

    try {
      await updateBackendQty(productId, item.quantity - 1);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI
      setItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  const clearCart = async () => {
    await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/cart/clear`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setItems([]);
    setTotalQty(0);
    setTotalPrice(0);
  };

  return (
    <div className="all-container">
      <div className="cart-container">
        <h1 className="heading">Shopping Cart</h1>
        <hr />
        {items.length !== 0 ? (
          items.map((data) => (
            <div className="cart-details" key={data.productId}>
              <img src={data.image} alt={data.title} className="cart-logo" />

              <div className="cart-info">
                <h1>{data.title}</h1>
                <p>Price: ${roundOff(data.price)}</p>

                <div className="quantity-container">
                  <span>Quantity: </span>
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(data.productId)}>
                      -
                    </button>
                    <span>{data.quantity}</span>
                    <button onClick={() => increaseQty(data.productId)}>
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(data.productId)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <>
            <h1 style={{ color: "red" }}>Please add items to your cart.</h1>
            <button onClick={() => navigate("/products")} className="prod-btn">
              Go to Products
            </button>
          </>
        )}

        <hr />
        <div className="foot">
          <h1>
            Subtotal ({totalQty} Items): ${roundOff(totalPrice)}
          </h1>
        </div>
      </div>

      <div className="checkout-box">
        <h2>Order Summary</h2>
        <hr />

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${roundOff(totalPrice)}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
          disabled={isButtonDisabled}
        >
          Proceed to Buy
        </button>
        <button
          className="clear-cart-btn"
          onClick={() => clearCart()}
          disabled={isButtonDisabled}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
