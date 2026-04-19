import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/userOrders.css";

function UserOrders() {
  const mobile = localStorage.getItem("mobile");
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userRes = await axios.get(
          `https://blinkit-2-yemv.onrender.com/profile/${mobile}`
        );

        setUser(userRes.data);

        const orderRes = await axios.get(
          `https://blinkit-2-yemv.onrender.com/my-orders/${userRes.data.email}`
        );

        setOrders(orderRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (mobile) fetchOrders();
  }, [mobile]);

  if (!mobile) {
    return <div className="orders-message">Please login first</div>;
  }

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="orders-message">No orders found</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3 className="order-id">Order ID: {order._id}</h3>
            <p className="order-status">Status: {order.status}</p>

            {order.products.map((item, index) => (
              <div key={index} className="order-product">
                <img
                  src={`https://blinkit-2-yemv.onrender.com/images/${item.file}`}
                  className="order-img"
                />
                <div className="order-details">
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrders;