import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminManageOrder.css";
import { sendStatusEmail } from "../utils/sendStatusEmail";

function AdminManageOrders() {
  const [orders, setOrders] = useState([]);
  const statusList = ["Pending", "Shipped", "Delivered", "Cancelled"];

  const getOrders = async () => {
    try {
      const res = await axios.get("https://blinkit-2-yemv.onrender.com/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  async function orderStatus(order, e) {
    try {
      const status = e.target.value;

      await axios.put(
        `https://blinkit-2-yemv.onrender.com/orders/${order._id}`,
        { status }
      );

      if (order.user?.email) {
        await sendStatusEmail({
          to_email: order.user.email,
          customer_name: order.user.fullName || "Customer",
          order_id: order._id,
          order_status: status,
          payment_method: order.user?.payment || "N/A",
          address: order.user?.address || "N/A",
        });
      }

      alert(`Order status updated to ${status}`);
      getOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to update status or send email");
    }
  }

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`https://blinkit-2-yemv.onrender.com/orders/${id}`);
      alert("Order Deleted");
      getOrders();
    } catch (err) {
      console.log(err);
    }
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
                ) : (
                  "No items"
                )}
              </td>

              <td>₹{order.totalPrice}</td>

              <td>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A"}
              </td>

              <td>{order.user?.address || "N/A"}</td>
              <td>{order.user?.payment || "N/A"}</td>

              <td>
                <select
                  className="form-control"
                  value={order.status || "Pending"}
                  onChange={(e) => orderStatus(order, e)}
                >
                  {statusList.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <button onClick={() => deleteOrder(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManageOrders;