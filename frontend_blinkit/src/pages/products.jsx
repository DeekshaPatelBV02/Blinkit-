import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/products.css";

function Products() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://blinkit-2-yemv.onrender.com/getCategories")
      .then((res) => {
        console.log("Categories API response:", res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log("Categories error:", err));
  }, []);

  return (
    <div className="grid">
      {categories.length === 0 ? (
        <h2>No Categories Found</h2>
      ) : (
        categories.map((cat) => (
          <div className="category-card" key={cat._id}>
            <img
              src={`https://blinkit-2-yemv.onrender.com/images/${cat.image}`}
              alt={cat.name}
              onClick={() => navigate(`/products/${cat.name}`)}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Products;