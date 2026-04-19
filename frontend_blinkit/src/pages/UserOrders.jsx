import React, { useEffect, useState } from "react";
import "../styles/userOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  //  GET LOGGED USER
  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH USER ORDERS
  useEffect(() => {
    if (user) {
      fetch(`https://blinkit-2-yemv.onrender.com/my-orders/${user.mobile}`)
        .then(res => res.json())
        .then(data => setOrders(data.orders))
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <div className="user-orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="user-order-card">
            <p><b>Total:</b> ₹{order.totalPrice}</p>
            <p><b>Status:</b> {order.status}</p>

            <div className="user-order-products">
                {order.products.map((p, i) => (
                    <div key={i} className="user-order-product">
                        <img src={p.imageUrl} alt={p.name} />
                        <p>{p.name}</p>
                     </div>
                     ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrders;