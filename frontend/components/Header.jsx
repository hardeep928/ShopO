import "../css/Header.css";
import Logo from "../src/assets/erasebg-transformed.png";
import Search from "../src/assets/search.png";
import Cart from "../src/assets/cart.png";
import Heart from "../src/assets/heart.png";
import User from "../src/assets/user.png";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = ({ setFilteredProds }) => {
  const [isOpen, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const path = ["/profile", "/about", "/", "/cart", "/wishlist", "/orders"];
  const location = useLocation();
  const hideSearch =
    path.includes(location.pathname) ||
    location.pathname.startsWith("/Information");

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    setFilteredProds(e.target.value);
  };

  const handleLogout = () => {
    const choice = confirm("Are you sure you want to Logout of the Session?");
    if (choice) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
    }
  };

  const handleMenuClick = () => {
    setOpen(false);
  };

  return (
    <div className="header-container">
      <div className="left">
        {width < 600 ? (
          <>
            <div style={{ zIndex: 1003 }}>
              <Hamburger toggled={isOpen} toggle={setOpen} size={25} />
            </div>
            {isOpen && (
              <ul className="mobile-menu">
                <li>
                  <NavLink to="/" onClick={handleMenuClick}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" onClick={handleMenuClick}>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" onClick={handleMenuClick}>
                    About
                  </NavLink>
                </li>
              </ul>
            )}
          </>
        ) : (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="logo">
        <NavLink to="/">
          <img src={Logo} alt="logo" />
        </NavLink>
      </div>
      <div className="right">
        {!hideSearch ? (
          <input
            type="text"
            className="searchbox"
            placeholder="Search products"
            name="search"
            onChange={handleSearch}
          />
        ) : null}
        {token ? (
          <button className="logreg-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="logreg-btn"
            onClick={() => navigate("/account/login")}
          >
            Login
          </button>
        )}
        <NavLink to="/cart">
          <img src={Cart} alt="Cart Icon" />
        </NavLink>
        <NavLink to="/profile">
          <img src={User} alt="User Icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
