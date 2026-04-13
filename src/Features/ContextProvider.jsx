import React, { createContext, useReducer, useEffect } from 'react';
import CartReducer from './CartReducer';
import axios from "axios";

export const CartContext = createContext();

const ContextProvider = ({ children }) => {

  const getInitialCart = () => {
    try {
      const data = localStorage.getItem("cart");
      if (!data || data === "undefined") {
        return [];
      }
      return JSON.parse(data).filter(item => item && item._id);
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  };

  const [cart, dispatch] = useReducer(CartReducer, [], getInitialCart);

  
  useEffect(() => {
  axios.get("https://blinkit-2-yemv.onrender.com/getCart")
    .then(res => {
      if (res.data && Array.isArray(res.data.product)) {

        const cleanCart = res.data.product.filter(
          item => item && item._id && item.quantity
        );

        dispatch({
          type: "SET_CART",
          payload: cleanCart
        });
      }
    })
    .catch(err => console.log(err));
}, []);
 
  useEffect(() => {
   
    localStorage.setItem("cart", JSON.stringify(cart));

   
    axios.post("https://blinkit-2-yemv.onrender.com/addCart", {
      cart
    });

  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default ContextProvider;