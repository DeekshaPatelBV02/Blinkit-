import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useContext } from "react";
import { CartContext } from "../Features/ContextProvider";
import { totalItem } from "../Features/CartReducer";

function Header() {
  const { cart = [] } = useContext(CartContext);
  const navigate = useNavigate();

  // check login using mobile
  const mobile = localStorage.getItem("mobile");

  const handleAccountClick = () => {
    navigate("/profile");
  };

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

      {/* LOGIN / ACCOUNT */}
      <div className="nav-login">
        {!mobile ? (
          <Link to="/login">Login</Link>
        ) : (
          <span className="account-text" onClick={handleAccountClick}>
            Account
          </span>
        )}
      </div>

      {/* CART */}
      <div className="nav-cart">
        <Link to="/cart" className="cart-link">
          <i className="fa-solid fa-cart-arrow-down"></i>
          <span className="cart-count">{totalItem(cart)}</span>
          <span className="cart-text">Cart</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;