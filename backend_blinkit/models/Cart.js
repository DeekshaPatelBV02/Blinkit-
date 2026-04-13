const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  product: [
    {
      _id: String,
      name: String,
      price: Number,
      category: String,
      quantity: Number,
      description: String,
      file: String
    }
  ]
});

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;