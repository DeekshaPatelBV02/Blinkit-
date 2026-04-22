import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

function AllAnalyticsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://blinkit-2-yemv.onrender.com/admin/all-analytics")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3>All Analytics</h3>

      <LineChart width={700} height={350} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        
        <Line dataKey="dateOrders" stroke="blue" />

        
        <Line dataKey="monthOrders" stroke="green" />

    
        <Line dataKey="yearOrders" stroke="red" />
      </LineChart>
    </div>
  );
}

export default AllAnalyticsChart;