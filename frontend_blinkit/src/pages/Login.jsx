import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { sendOtpEmail } from "../utils/sendOtp"; // or ../utils/sendOtp if that is your actual filename

function Login() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobile.trim()) {
      alert("Enter mobile number");
      return;
    }

    try {
      const res = await axios.post(
        "https://blinkit-2-yemv.onrender.com/sendOtp",
        { mobile: mobile.trim() }
      );

      const otp = res.data.otp;
      console.log("OTP:", otp);

      const userRes = await axios.post(
        "https://blinkit-2-yemv.onrender.com/getUserByMobile",
        { mobile: mobile.trim() }
      );

      const email = userRes.data.email;
      console.log("EMAIL FROM BACKEND:", email);

      if (!email) {
        alert("Email not found for this mobile number");
        return;
      }

      const sent = await sendOtpEmail(email, otp);

      if (!sent) {
        alert("OTP email failed");
        return;
      }

      alert("OTP sent to your email");
      navigate("/sign", { state: { mobile: mobile.trim() } });
    } catch (err) {
      console.log("API ERROR:", err);
      console.log("API ERROR DATA:", err.response?.data);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to send OTP");
      }
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
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <button type="submit" className="button1">
            Continue
          </button>

          <p className="terms">
            By continuing, you agree to our <a href="#">Terms of service</a> &{" "}
            <a href="#">Privacy policy</a>
          </p>

          <p className="new-user-text">
            New User?{" "}
            <span
              className="signup-link"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;