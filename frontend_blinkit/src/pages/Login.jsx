import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://blinkit-2-yemv.onrender.com/sendOtp",
      { mobile }
    );

    console.log("OTP response:", res.data);
    alert("OTP is: " + res.data.otp);   // 👈 ADD THIS LINE

    navigate("/sign", { state: { mobile } });

  } catch (err) {
    console.log("API Error:", err);
    alert("Failed to send OTP");
  }
};
  return (
    <form onSubmit={handleSubmit}>
      <div className="overlay">
        <div className="login-box">

          <div className="logo1">
            blink<span className="it">it</span>
          </div>

          <h2>India's last minute app</h2>
          <p className="sub">Log in or Sign up</p>

          <div className="input-box">
            <input
              type="text"
              placeholder="Enter mobile number"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <button type="submit" className="button1">
            Continue
          </button>
          <p className="terms"> By continuing, you agree to our <a href="#">Terms of service</a> &{" "} <a href="#">Privacy policy</a> </p>
        
          <p className="new-user-text">New User? <span className="signup-link" onClick={()=>navigate("/signup")}>Signup</span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;