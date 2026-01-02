import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import Illustration from "../src/assets/illustration.png";
import { useEffect, useState } from "react";

const Home = () => {
  const gridImages = [
    { title: "New Arrivals", image: "../src/assets/NewArrivals.jpg" },
    { title: "Best Sellers", image: "../src/assets/Bestsellers.webp" },
    { title: "Offers", image: "../src/assets/Offers.jpg" },
  ];

  const categories = [
    "mens-shirts",
    "womens-dresses",
    "womens-jewellery",
    "mens-watches",
  ];

  const [prod, setProd] = useState([]);

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/products");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsArray = await Promise.all(
        categories.map(async (category) => {
          const res = await fetch(
            `https://dummyjson.com/products/category/${category}?limit=1`
          );
          const data = await res.json();
          return data.products[0];
        })
      );
      setProd(productsArray);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="home-container">
        <div>
          <h1>Define Your Style</h1>
          <p>
            Discover the latest trends in Fashion with our curated collection
          </p>

          <div className="btn">
            <button onClick={clickHandler}>Shop Now</button>
          </div>
        </div>

        <div>
          <img src={Illustration} alt="Model image" />
        </div>
      </div>

      <div className="collections">
        <h1>Featured Collections</h1>

        <div className="grid-container">
          {gridImages.map((item, index) => (
            <div
              key={index}
              className="grid-item"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div>
                {item.title}
                <br />
                <button className="grid-btn" onClick={clickHandler}>
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="trending">
        <h1>Trending Now</h1>

        <div className="prod-container">
          {prod &&
            prod.map((prods) => (
              <div className="products" key={prods.id}>
                <div className="imgcontainer">
                  <img src={prods.images[0]} alt="Men's Clothing" />
                </div>

                <div className="details">
                  <h2>{prods.title}</h2>
                  <p className="rating">🌟{prods.rating}</p>

                  <div className="flex">
                    <h3 className="price">${prods.price}</h3>
                    <button
                      className="button"
                      onClick={() =>
                        navigate(`/Information/${prods.id}/${prods.title}`)
                      }
                    >
                      Tap to View
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
