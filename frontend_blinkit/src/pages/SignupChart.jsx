'use client';
import { useEffect } from 'react';
import{
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
}from 'recharts';
function SignupChart(){
    const [data,setData]=useState([]);

    useEffect(()=>{
        axios.get("https://blinkit-2-yemv.onrender.com/admin/signup-count")
        .then((res)=>setData(res.data))
        .catch((err)=>console.log("Signup Chart error:",err));
    },[]);
    return(
        <div className="chart-page">
            <h2>Signup Counts</h2>
            <div className="chart-box">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="label"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone"dataKey="dateOrders" stroke="#2563eb" strokeWidth={3}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default SignupChart;