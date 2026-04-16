const OrderModel = require("../models/order");
const sendMail = require("./sendEmail"); // adjust path if needed

exports.placeOrder = async (req, res) => {
  try {
    const orderData = req.body;
    console.log("Saving order:", orderData.user);

    if (!orderData.user || !orderData.user.email) {
      return res.status(400).json({ message: "User email required" });
    }

    if (!orderData.products || orderData.products.length === 0) {
      return res.status(400).json({ message: "Products required" });
    }

    const newOrder = new OrderModel({
      ...orderData,
      user: {
        fullName: orderData.user.fullName,
        email: orderData.user.email,
        number: orderData.user.number,
        address: orderData.user.address,
        payment: orderData.user.payment
      }
    });

    await newOrder.save();

    const message = `
      <h2>Order Placed Successfully</h2>
      <p>Hello ${orderData.user.fullName},</p>
      <p>Your order has been placed successfully.</p>
      <p><b>Payment:</b> ${orderData.user.payment}</p>
      <p><b>Address:</b> ${orderData.user.address}</p>
      <p><b>Total Items:</b> ${orderData.totalItems}</p>
      <p><b>Total Price:</b> ₹${orderData.totalPrice}</p>
    `;

    try {
      await sendMail(
        orderData.user.email,
        "Order Placed Successfully",
        message
      );
    } catch (mailError) {
      console.log("Email sending failed:", mailError);
    }

    res.status(200).json({
      success: true,
      message: "Order placed successfully"
    });

  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message
    });
  }
};