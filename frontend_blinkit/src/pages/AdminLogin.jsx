import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Adminlogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const adminEmail = "deekshapatelbv2@gmail.com";
  const adminPassword = "123456";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      alert("Login Successful ");

  
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Email or Password ");
    }
  };

  return (
    <div className="adminpage">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin} className="admindetails">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;