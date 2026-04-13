/*const { createRazorpayInstance } = require("../config/razorpay.config");
const crypto = require("crypto");

require("dotenv").config();

const razorpayInstance = createRazorpayInstance();


exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, 
    currency: "INR",
    receipt: "receipt_"+Date_now(),
  };

  try {
    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};


exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    return res.status(200).json({
      success: true,
      message: "Payment verified"
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment not verified"
    });
  }
};*/