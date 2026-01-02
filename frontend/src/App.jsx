import "./App.css";
import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Products from "../components/Products";
import About from "../components/About";
import Profile from "../components/Profile";
import Wishlist from "../components/Wishlist";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Information from "../components/Information";
import { useState } from "react";
import Account from "../components/Account";
import Register from "../components/Register";
import Login from "../components/Login";
import Checkout from "../components/Checkout";
import Orders from "../components/Orders";
import PaymentSuccessful from "../components/PaymentSuccessful";
import UpdateEmail from "../components/UpdateEmail";
import UpdatePassword from "../components/UpdatePassword";
import UpdateUsername from "../components/UpdateUsername";

function App() {
  const [filteredProds, setFilteredProds] = useState("");
  const [cartLength, setCartLength] = useState("");

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  setFilteredProds={setFilteredProds}
                  cartLength={cartLength}
                />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Header
                  setFilteredProds={setFilteredProds}
                  cartLength={cartLength}
                />
                <Products
                  filteredProds={filteredProds}
                  setFilteredProds={setFilteredProds}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header
                  setFilteredProds={setFilteredProds}
                  cartLength={cartLength}
                />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header
                  setFilteredProds={setFilteredProds}
                  cartLength={cartLength}
                />
                <Profile />
                <Footer />
              </>
            }
          />
          <Route
            path="/wishlist"
            element={
              <>
                <Header
                  setFilteredProds={setFilteredProds}
                  cartLength={cartLength}
                />
                <Wishlist />
                <Footer />
              </>
            }
            filteredProds={filteredProds}
          />
          <Route
            path="/cart"
            element={
              <>
                <Header
                  setFilteredProds={setFilteredProds}
                  cartLength={cartLength}
                />
                <Cart setCartLength={setCartLength} />
                <Footer />
              </>
            }
            filteredProds={filteredProds}
          />
          <Route
            path="/Information/:id/:title"
            element={
              <>
                <Header
                  setFilteredProds={setFilteredProds}
                  cartLength={cartLength}
                />
                <Information />
                <Footer />
              </>
            }
          />

          <Route path="/account" element={<Account />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
                <Footer />
              </>
            }
          />

          <Route path="/payment-success" element={<PaymentSuccessful />} />

          <Route path="/change-username" element={<UpdateUsername />} />
          <Route path="/change-email" element={<UpdateEmail />} />
          <Route path="/change-password" element={<UpdatePassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
