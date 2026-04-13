
const User = require("../models/users");
require("dotenv").config

const crypto = require("crypto");
const sendMail = require("./sendEmail");

const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};


exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number required" });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({ mobile, otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    }
     await sendMail(
      process.env.EMAIL_USER,  
      "Your Blinkit OTP",
      `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`
    );

    console.log("Generated OTP:", otp); 

    res.json({ message: "OTP Sent Successfully", mobile });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { sendOtp: exports.sendOtp };