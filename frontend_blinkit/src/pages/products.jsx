import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/products.css";

function Products() {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get("https://blinkit-3-qi0k.onrender.com/getCategories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  return (

    <div className="grid">

      {categories.map((cat) => (

        <div className="category-card" key={cat._id}>

          <img
            src={`https://blinkit-3-qi0k.onrender.com/Images/${cat.image}`}
            alt={cat.name}
            onClick={() => navigate(`/products/${cat.name}`)}
          />

        </div>

      ))}

    </div>

  );

}

export default Products;