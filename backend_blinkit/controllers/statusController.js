const OrderModel = require("../models/order");

exports.status = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};