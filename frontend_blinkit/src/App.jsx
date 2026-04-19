import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import AddUsers from "./pages/AddUsers";
import AdminRoutes from "./pages/AdminRoute";
import ProductsPage from "./pages/ProductsPage";
import SingleProduct from "./pages/SingleProduct";

import Orders from "./pages/Orders";


import "@fortawesome/fontawesome-free/css/all.min.css";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import UserOrders from "./pages/UserOrders";


function App() {

 
const [products, setProducts] = useState([]);
  return (

    <Routes>


      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/signup" element={<AddUsers />} />
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>

      <Route path="/profile" element={<Profile />} />
      <Route path="/my-orders" element={<UserOrders />} />
      <Route path="/products/:category" element={<ProductsPage/>} />
      <Route path="/product/:id"element={<SingleProduct/>}/>
      
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin/*" element={<AdminRoutes products={products} setProducts={setProducts}/>}/>

    </Routes>

  );
}

export default App;