import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from "recharts";

function PaymentCountChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://blinkit-2-yemv.onrender.com/admin/payment-wise")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Payment count error:", err));
  }, []);

  const colors = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

  return (
    <div className="chart-page">
      <h2>Number of Payment Received</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={140}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PaymentCountChart;