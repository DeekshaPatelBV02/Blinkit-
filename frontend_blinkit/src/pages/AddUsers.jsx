import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../styles/addUsers.css";

function AddUsers() {

  const navigate = useNavigate();  

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reg = async () => {

    if (!name || !phone || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await axios.post("https://blinkit-3-qi0k.onrender.com/register", {name,phone,email,password});

localStorage.setItem("user", JSON.stringify(res.data));
      alert("User Registered Successfully ");
      navigate("/");
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.log(err);
      alert("Registration Failed ");
    }
  };

  return (
    <div className="signup-overlay">

      <div className="signup-container">

        <div className="signup-logo">
          blink<span className="signup-it">it</span>
        </div>

        <h2 className="signup-title">Create Account</h2>

        <p className="signup-subtitle">Signup to continue</p>

        <div className="signup-input-box">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="signup-input-box">
          <input
            type="number"
            placeholder="Enter Mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="signup-input-box">
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="signup-input-box">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="signup-button" onClick={reg}>
          Signup
        </button>

      </div>

    </div>
  );
}

export default AddUsers;