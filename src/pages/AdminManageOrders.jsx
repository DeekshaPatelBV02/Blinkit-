import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/AdminManageOrder.css";

function AdminManageOrders() {
  const [orders, setOrders] = useState([]);
  const statusList = ["Shipped", "Delivered", "Cancelled"];


  async function orderStatus(id, e) {
    try {
      let status = e.target.value;

      await axios.put(`https://blinkit-2-yemv.onrender.com/${id}`, { status })

      getOrders(); 
    } catch (err) {
      console.log(err);
    }
  }


  const getOrders = () => {
    axios
      .get(`https://blinkit-2-yemv.onrender.com/orders`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  }, []);

  
  const deleteOrder = (id) => {
    axios
      .delete(`https://blinkit-2-yemv.onrender.com/orders/${id}`)
      .then(() => {
        alert("Order Deleted");
        getOrders();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-orders">
      <h2>Orders</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Items</th>
            <th>Total</th>
            <th>Date</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>

              
              <td>
                {order.products?.length > 0 ? (
                  order.products.map((item, i) => (
                    <p key={i}>
                      {item.name} (₹{item.price} × {item.quantity})
                    </p>
                  ))
                ) : ("No items")}
              </td>

            
              <td>₹{order.totalPrice}</td>

              
              <td>
                {order.createdAt? new Date(order.createdAt).toLocaleString():"N/A"}
              </td>

             
              <td>{order.user?.address || "N/A"}</td>

              
              <td>{order.user?.payment || "N/A"}</td>

            
              <td>
                <select
                  className="form-control"
                  value={order.status || ""}
                  onChange={(e) => orderStatus(order._id, e)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>

                  {statusList.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>

              
              <td>
                <button onClick={() => deleteOrder(order._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManageOrders;