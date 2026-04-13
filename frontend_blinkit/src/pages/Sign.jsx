import React  from "react";
import "../styles/sign.css";
import { useLocation } from "react-router-dom";

function Sign() {
  const location = useLocation();
const mobile = location.state?.mobile || "";


  return (
    <div className="otp">
      <div className="navigation1"><i class="fa-solid fa-arrow-left"></i></div>
      <h2 className="verification">OTP Verification</h2>
      <p className="sentence">We have sent a verification code to</p>
      <p className="number">+91-{mobile}</p>

      <div className="boxes">
        <input maxLength="1" />
        <input maxLength="1" />
        <input maxLength="1" />
        <input maxLength="1" />
      </div>

      <button className="button2">Resend</button>
      <p className="resendcode">Resend code</p>
    </div>
  );
}

export default Sign;
