import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import { RechartsDevtools } from "@recharts/devtools"; // optional

function AllAnalyticsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://blinkit-2-yemv.onrender.com/admin/all-analytics")
      .then((res) => setData(res.data))
      .catch((err) => console.log("All analytics error:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h3>All Analytics</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="dateOrders"
            stroke="blue"
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="monthOrders"
            stroke="green"
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="yearOrders"
            stroke="red"
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />

          {/* <RechartsDevtools /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AllAnalyticsChart;