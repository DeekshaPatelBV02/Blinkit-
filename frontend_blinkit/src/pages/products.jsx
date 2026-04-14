import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/products.css";

function Products() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("https://blinkit-2-yemv.onrender.com/getCategories");
        console.log("Categories API response:", res.data);

        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.log("Unexpected response:", res.data);
          setError("Invalid categories response");
        }
      } catch (err) {
        console.log("Categories fetch error:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <h2>Loading categories...</h2>;
  if (error) return <h2>{error}</h2>;

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