import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/productspage.css";

function ProductsPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [category]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `https://blinkit-2-yemv.onrender.com/products/category/${category}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getImageSrc = (product) => {
    if (product.imageUrl) {
      return product.imageUrl;
    }
    if (product.file) {
      return `https://blinkit-2-yemv.onrender.com/images/${product.file}`;
    }
    return "https://via.placeholder.com/200";
  };

  return (
    <div className="product-page">
      <h2 className="product-title">{category} products</h2>

      <div className="product">
        {products.map((p) => (
          <div className="single-product" key={p._id}>
            <img
              src={getImageSrc(p)}
              alt={p.name}
              onClick={() => navigate(`/product/${p._id}`)}
            />

            <p className="product-name">{p.name}</p>
            <p className="product-price">₹{p.price}</p>
            <p className="product-description">{p.description}</p>

            <button
              className="add-btn"
              onClick={() => navigate(`/product/${p._id}`)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;