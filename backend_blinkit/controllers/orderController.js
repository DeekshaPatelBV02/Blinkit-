const OrderModel = require("../models/order");
const sendMail = require("./sendEmail");
const generateInvoicePDF = require("./invoicePdf");
const fs = require("fs");

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

    // GST calculation
    const subtotal = Number(orderData.totalPrice) || 0;
    const gstRate = 5;
    const gstAmount = (subtotal * gstRate) / 100;
    const finalTotal = subtotal + gstAmount;

    // total items calculation
    const totalItems = orderData.products.reduce((sum, item) => {
      return sum + Number(item.quantity || 0);
    }, 0);

    const newOrder = new OrderModel({
      products: orderData.products,
      user: {
        fullName: orderData.user.fullName,
        email: orderData.user.email,
        number: orderData.user.number,
        address: orderData.user.address,
        payment: orderData.user.payment,
      },
      subtotal: subtotal,
      gstRate: gstRate,
      gstAmount: gstAmount,
      totalItems: totalItems,
      totalPrice: finalTotal,
      status: "Pending"
    });

    await newOrder.save();

    const message = `
      <h2>Order Confirmed</h2>
      <p>Hello ${orderData.user.fullName},</p>
      <p>Your order has been placed successfully.</p>
      <p><strong>Items:</strong> ${orderData.products.map((p) => p.name).join(", ")}</p>
      <p><strong>Payment Method:</strong> ${orderData.user.payment}</p>
      <p><strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}</p>
      <p><strong>GST (${gstRate}%):</strong> ₹${gstAmount.toFixed(2)}</p>
      <p><strong>Total:</strong> ₹${finalTotal.toFixed(2)}</p>
      <p>Your invoice PDF is attached with this email.</p>
    `;

    try {
      const pdfPath = await generateInvoicePDF(
        {
          ...orderData,
          subtotal,
          gstRate,
          gstAmount,
          totalPrice: finalTotal,
          totalItems
        },
        newOrder._id.toString()
      );

      await sendMail(
        orderData.user.email,
        "Order Placed Successfully",
        message,
        [
          {
            filename: "invoice.pdf",
            path: pdfPath,
          },
        ]
      );

      console.log("Email with PDF sent successfully");

      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    } catch (mailError) {
      console.log("Email/PDF failed but order saved:", mailError.message);
    }

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};