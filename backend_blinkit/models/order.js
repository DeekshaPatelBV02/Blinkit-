const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      file: String
    }
  ],
  user: {
    fullName: String,
    email:String, 
    number: String,
    address: String,
    payment: String
  },
  totalItems: Number,
  totalPrice: Number,
  status: { type: String, default: "Pending" },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);