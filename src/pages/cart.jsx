import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Features/ContextProvider";
import CartProduct from "./CartProduct";
import { totalItem, totalPrice } from '../Features/CartReducer';
import "../styles/Cart.css";

const Cart = () => {
  
    const {cart} = useContext(CartContext)
    return (
        <div className="CartContainer">
            <div className="CartRow">
                <div className="col-8">
                    {cart.map((p) => (
                        <CartProduct key={p._id} product={p}></CartProduct>
                    ))}

                </div>
                <div className="col-4">
                    <div className="secondary">
                        <h5>Total Items: {totalItem(cart)}</h5>
                        <h5>Total Price:₹{totalPrice(cart)} </h5>
                        <Link to="/checkout">
                        <button className="cart-button-warning">Checkout</button>
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Cart;