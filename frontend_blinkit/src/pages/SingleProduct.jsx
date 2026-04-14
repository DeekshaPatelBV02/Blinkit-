import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/singleproduct.css";
import Header from "../components/Header";
import { CartContext } from "../Features/ContextProvider";

function SingleProduct() {
  const { dispatch } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `https://blinkit-2-yemv.onrender.com/products/${id}`
      );
      console.log(res.data);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <Header />
      <div className="single-product-page">
        <div className="single-image">
          <img
            src={`https://blinkit-2-yemv.onrender.com/images/${product.file}`}
            alt={product.name}
          />
        </div>

        <div className="information">
          <h2>{product.name}</h2>
          <p className="price">₹{product.price}</p>
          <p>{product.description}</p>
          <button
            className="buy-btn"
            onClick={() =>
              dispatch({
                type: "Add",
                product: {
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  file: product.file,
                },
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;