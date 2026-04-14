import { Link } from "react-router-dom";
import "../styles/header.css";
import { useContext } from "react";
import { CartContext } from "../Features/ContextProvider";
import { totalItem } from "../Features/CartReducer";

function Header() {
  const { cart = [] } = useContext(CartContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <div className="logo"></div>
      </div>

      <div className="nav-address">
        <p className="ava">Delivery in 10 minutes</p>
        <p className="ava1">Chikkamagaluru 577102</p>
      </div>

      <div className="nav-search">
        <div className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input placeholder="Search for groceries, fruits, snacks..." />
      </div>

      <div className="nav-login">
        <Link to="/login">Login</Link>
      </div>

      <div className="nav-cart">
        <Link to="/cart">
          <i className="fa-solid fa-cart-arrow-down"></i>
          <span>{totalItem(cart)}</span>
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Header;