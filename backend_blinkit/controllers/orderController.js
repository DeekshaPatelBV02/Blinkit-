const OrderModel = require("../models/order");
const sendMail = require("./sendEmail");

exports.placeOrder = async (req, res) => {
  try {
    const orderData = req.body;
     console.log(" Saving order:", orderData.user);
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
      <h2>Order Confirmed</h2>
      <p>Hello ${orderData.user.fullName},</p>
      <p>Your order has been placed successfully.</p>
      <p>Items: ${orderData.products.map(p => p.name).join(", ")}</p>
      <p>Total: ₹${orderData.totalPrice}</p>
    `;

    await sendMail(orderData.user.email, "Order Placed Successfully.", message);

    res.status(200).json({
      success: true,
      message: "Order placed & email sent"
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
