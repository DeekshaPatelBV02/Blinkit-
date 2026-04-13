import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://blinkit-3-qi0k.onrender.com/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="orders-container">

      <h2>Your Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>

          <h4>Status: 
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </h4>

          <p>Total Items: {order.totalItems}</p>
          <p>Total Price: ₹{order.totalPrice}</p>

          <div className="order-products">
            {order.products.map((p, i) => (
              <div key={i} className="order-product">
                <img
                  src={`https://blinkit-3-qi0k.onrender.com/images/${p.file}`}
                  alt={p.name}
                />
                <p>{p.name}</p>
                <p>₹{p.price}</p>
                <p>Qty: {p.quantity}</p>
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
}

export default Orders;