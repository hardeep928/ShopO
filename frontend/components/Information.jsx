import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Information.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Information = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setActiveImg(data.images?.[0]);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="loading">Loading...</p>;

  const handleCart = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/cart/add`,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: activeImg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Added to cart:");
      alert("Added to Cart");
      setAdded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="product-info">
      <button className="back-link" onClick={() => window.history.back()}>
        Back to Previous Page
      </button>
      <div className="info-img">
        <img src={activeImg} alt={product.title} className="main-img" />

        <div className="image-list">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="product"
              className={activeImg === img ? "active" : ""}
              onClick={() => setActiveImg(img)}
            />
          ))}
        </div>
      </div>

      <div className="info-details">
        <h1>{product.title}</h1>

        <p className="desc">{product.description}</p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {product.rating}
        </p>

        <p className="availability">
          <strong>Status:</strong>{" "}
          <span
            className={product.availabilityStatus === "In Stock" ? "in" : "out"}
          >
            {product.availabilityStatus}
          </span>
        </p>

        <h2 className="price">${product.price}</h2>

        <div className="extra-info">
          <div>
            <h4>📦 Dimensions</h4>
            <p>Width: {product.dimensions?.width}</p>
            <p>Height: {product.dimensions?.height}</p>
            <p>Depth: {product.dimensions?.depth}</p>
          </div>

          <div>
            <h4>🛡 Warranty</h4>
            <p>{product.warrantyInformation}</p>
          </div>

          <div>
            <h4>🚚 Shipping</h4>
            <p>{product.shippingInformation}</p>
          </div>
        </div>

        {!token ? (
          <button
            className="cart-btn"
            onClick={() => navigate("/account/login")}
          >
            Login to Add to Cart
          </button>
        ) : (
          <button
            className="cart-btn"
            onClick={added ? handleGoToCart : handleCart}
          >
            {!added ? "Add to Cart" : "Show Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Information;
