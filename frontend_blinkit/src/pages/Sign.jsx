import React, { useState } from "react";
import "../styles/sign.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Sign() {
  const location = useLocation();
  const navigate = useNavigate();

  const mobile = location.state?.mobile || "";
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      alert("Enter 4 digit OTP");
      return;
    }

    try {
      const res = await axios.post(
        "https://blinkit-2-yemv.onrender.com/verifyOtp",
        {
          mobile,
          otp: finalOtp,
        }
      );

      console.log("VERIFY RESPONSE:", res.data);

      if (res.data.success) {
        alert("Login successful");
        navigate("/");
      } else {
        alert(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Invalid or Expired OTP");
      }
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(
        "https://blinkit-2-yemv.onrender.com/sendOtp",
        { mobile }
      );

      alert(res.data.message || "OTP Resent");
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to resend OTP");
      }
    }
  };

  return (
    <div className="otp">
      <div className="navigation1">
        <i
          className="fa-solid fa-arrow-left"
          onClick={() => navigate(-1)}
        ></i>
      </div>

      <h2 className="verification">OTP Verification</h2>
      <p className="sentence">We have sent a verification code to your registered email</p>
      <p className="number">+91-{mobile}</p>

      <div className="boxes">
        {otp.map((data, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
      </div>

      <button className="button2" onClick={handleVerify}>
        Verify OTP
      </button>

      <p className="resendcode" onClick={handleResend}>
        Resend code
      </p>
    </div>
  );
}

export default Sign;