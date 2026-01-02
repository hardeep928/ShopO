import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Products = ({ filteredProds, setFilteredProds }) => {
  const [prod, setProd] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(16);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProds]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, [currentPage]);

  const categories = [
    "mens-shirts",
    "womens-dresses",
    "womens-jewellery",
    "mens-watches",
    "mens-shoes",
    "womens-bags",
    "womens-shoes",
    "fragrances",
    "beauty",
  ];

  const displayedProducts = filteredProds
    ? prod.filter((item) =>
        item.title.toLowerCase().includes(filteredProds.toLowerCase())
      )
    : prod;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = displayedProducts.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const fetchProducts = async () => {
      const responses = await Promise.all(
        categories.map(async (category) => {
          const res = await fetch(
            `https://dummyjson.com/products/category/${category}`
          );
          const data = await res.json();
          return data.products;
        })
      );

      const allProducts = responses.flat();
      setProd(allProducts);
      setFilteredProds("");
    };

    fetchProducts();
  }, []);

  const prevHandler = () => {
    window.history.back();
  };

  if (!prod) return <p className="loading">Loading...</p>;

  return (
    <>
      <div className="prod-container">
        {displayedProducts.length === 0 ? (
          <div className="no-results">
            <h2>No items found 😕</h2>
            <p>Try searching with a different keyword</p>
          </div>
        ) : (
          currentPost &&
          currentPost.map((prods) => (
            <div className="products" key={prods.id}>
              <div className="imgcontainer">
                <img src={prods.images?.[0]} alt={prods.title} />
              </div>

              <div className="details">
                <h2>{prods.title}</h2>
                <p className="rating">🌟 {prods.rating}</p>

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
          ))
        )}
      </div>
      <Pagination
        totalPosts={displayedProducts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Products;
