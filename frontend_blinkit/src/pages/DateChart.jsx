import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function DateChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://blinkit-2-yemv.onrender.com/admin/date-orders")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3>Date Wise Orders</h3>

      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="orders" stroke="blue" />
      </LineChart>
    </div>
  );
}

export default DateChart;