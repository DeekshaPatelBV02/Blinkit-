import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ViewProducts.css";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get("https://blinkit-2-yemv.onrender.com/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (products.length === 0) {
    return (
      <div className="empty">
        <h3>No Products Available</h3>
        <button onClick={() => navigate("/admin/add-product")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="view">
      <h2 className="title">Product List</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
            ) : (
              <div>No Image</div>
            )}

            <h4>{product.name}</h4>
            <p className="price">₹{product.price}</p>
            <h4>{product.category}</h4>
          </div>
        ))}
      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/admin/add-product")}
      >
        Add More Products
      </button>
    </div>
  );
}

export default ViewProducts;