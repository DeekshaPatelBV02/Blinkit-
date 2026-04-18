import React, { useContext } from "react";
import { CartContext } from "../Features/ContextProvider";
import "../styles/cartproduct.css";

const CartProduct = ({ product }) => {
  const { cart, dispatch } = useContext(CartContext);

  const Increase = (id) => {
    const index = cart.findIndex((p) => p._id === id);
    if (index !== -1 && cart[index].quantity < 10) {
      dispatch({ type: "Increase", id });
    }
  };

  const Decrease = (id) => {
    const index = cart.findIndex((p) => p._id === id);
    if (index !== -1 && cart[index].quantity > 1) {
      dispatch({ type: "Decrease", id });
    }
  };

  return (
    <div className="contain">
      <div className="CartProduct">
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.name}
        />

        <div className="detail">
          <h4>{product.name}</h4>
          <h5>₹{product.price}</h5>

          <div className="buttons">
            <button
              className="rounded-circle1"
              onClick={() => Decrease(product._id)}
            >
              <b>-</b>
            </button>

            <button className="rounded-circle2">
              {product.quantity}
            </button>

            <button
              className="rounded-circle3"
              onClick={() => Increase(product._id)}
            >
              <b>+</b>
            </button>
          </div>

          <button
            className="button-warning"
            onClick={() => dispatch({ type: "Remove", id: product._id })}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;