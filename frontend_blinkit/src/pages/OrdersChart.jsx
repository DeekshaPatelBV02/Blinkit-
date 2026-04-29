import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function OrdersChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://blinkit-2-yemv.onrender.com/admin/orders-count-chart")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Orders chart error:", err));
  }, []);

  return (
    <div className="chart-page">
      <h2>Number of Orders</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#0f766e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default OrdersChart;