import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function YearChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://blinkit-2-yemv.onrender.com/admin/orders-yearwise")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Year wise error:", err));
  }, []);

  return (
    <div className="chart-page">
      <h2>Year Wise Orders</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="yearOrders" stroke="#dc2626" fill="#fca5a5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default YearChart;