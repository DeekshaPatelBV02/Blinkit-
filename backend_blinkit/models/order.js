const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
        imageUrl: String
      }
    ],

    user: {
      fullName: String,
      email: String,
      number: String,
      address: String,
      payment: String
    },

    subtotal: {
      type: Number,
      default: 0
    },

    gstRate: {
      type: Number,
      default: 5
    },

    gstAmount: {
      type: Number,
      default: 0
    },

    totalPrice: Number,
    totalItems: Number,

    status: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true   
  }
);

module.exports = mongoose.model("Order", orderSchema);