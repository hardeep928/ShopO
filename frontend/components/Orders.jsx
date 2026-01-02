import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/orders/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (err) {
      console.error("Failed to cancel order", err);
    }
  };

  const removeOrder = async (orderId) => {
    if (!window.confirm("Remove this order permanently?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/orders/delete/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Failed to remove order", err);
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>My Orders</h2>
      </div>
      {orders.length === 0 ? (
        <p className="empty-orders">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-top">
              <div>
                <p>
                  <strong>Order ID:</strong> {order._id.slice(-6).toUpperCase()}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </div>
            </div>

            <div className="order-products">
              {order.products.map((item) => (
                <div className="order-item" key={item._id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p className="title">{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-bottom">
              <p>
                <strong>Payment:</strong> {order.paymentMethod.toUpperCase()}
              </p>
              <p>
                <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
              </p>

              {order.status === "Placed" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}

              {order.status === "Cancelled" && (
                <button
                  className="remove-btn"
                  onClick={() => removeOrder(order._id)}
                >
                  Remove Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
