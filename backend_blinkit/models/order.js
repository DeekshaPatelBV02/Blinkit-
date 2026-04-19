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
    email: String,
    number: String,
    address: String,
    payment: String
  },

  // ✅ NEW FIELDS FOR GST
  subtotal: {
    type: Number,
    default: 0
  },
  gstRate: {
    type: Number,
    default: 5   // you can change later
  },
  gstAmount: {
    type: Number,
    default: 0
  },

  // ✅ FINAL TOTAL (with GST)
  totalPrice: Number,

  totalItems: Number,

  status: {
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);