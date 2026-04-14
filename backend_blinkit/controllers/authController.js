const User = require("../models/users");
const crypto = require("crypto");
const sendMail = require("./sendEmail");

const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    console.log("SEND OTP BODY:", req.body);

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

    console.log("Generated OTP:", otp);

    sendMail(
      process.env.EMAIL_USER,
      "Your Blinkit OTP",
      `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`
    ).catch((mailError) => {
      console.log("MAIL ERROR:", mailError);
    });

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      mobile,
      otp
    });
  } catch (error) {
    console.log("SEND OTP ERROR:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });
  } catch (error) {
    console.log("VERIFY OTP ERROR:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  sendOtp: exports.sendOtp,
  verifyOtp: exports.verifyOtp
};