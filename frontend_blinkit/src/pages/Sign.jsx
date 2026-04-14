import React, { useState } from "react";
import "../styles/sign.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Sign() {
  const location = useLocation();
  const navigate = useNavigate();

  const mobile = location.state?.mobile || "";

  const [otp, setOtp] = useState(["", "", "", ""]);

  // Handle OTP input change
  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next box
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    const finalOtp = otp.join("");

    try {
      const res = await axios.post("https://blinkit-2-yemv.onrender.com/verifyOtp", {
        mobile,
        otp: finalOtp,
      });

      console.log("VERIFY RESPONSE:", res.data);   // 👈 ADD THIS LINE

      if (res.data.success) {
        navigate("/");
      }
    } catch (err) {
      alert("Invalid or Expired OTP");
    }
  };

  return (
    <div className="otp">
      <div className="navigation1">
        <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
      </div>

      <h2 className="verification">OTP Verification</h2>
      <p className="sentence">We have sent a verification code to</p>
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

      {/* Verify Button */}
      <button className="button2" onClick={handleVerify}>
        Verify OTP
      </button>

      {/* Resend */}
      <p className="resendcode" onClick={async () => {
        await axios.post("https://blinkit-2-yemv.onrender.com/sendOtp", { mobile });
        alert("OTP Resent");
      }}>
        Resend code
      </p>
    </div>
  );
}

export default Sign;