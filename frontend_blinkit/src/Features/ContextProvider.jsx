import React, { createContext, useReducer, useEffect, useRef } from "react";
import CartReducer from "./CartReducer";
import axios from "axios";

export const CartContext = createContext();

const API_URL = "https://blinkit-2-yemv.onrender.com";

const ContextProvider = ({ children }) => {
  const didMount = useRef(false);

  const getInitialCart = () => {
    try {
      const data = localStorage.getItem("cart");
      if (!data || data === "undefined") return [];
      return JSON.parse(data).filter(item => item && item._id);
    } catch (error) {
      console.log("Error reading cart from localStorage:", error);
      return [];
    }
  };

  const [cart, dispatch] = useReducer(CartReducer, [], getInitialCart);

  useEffect(() => {
    axios
      .get(`${API_URL}/getCart`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.product)) {
          const cleanCart = res.data.product.filter(
            (item) => item && item._id && item.quantity
          );

          dispatch({
            type: "SET_CART",
            payload: cleanCart,
          });
        }
      })
      .catch((err) => console.log("getCart error:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    axios
      .post(`${API_URL}/addCart`, { cart })
      .then((res) => console.log("Cart saved:", res.data))
      .catch((err) => console.log("addCart error:", err));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default ContextProvider;