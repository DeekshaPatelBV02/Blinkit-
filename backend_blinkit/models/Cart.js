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
      imageUrl:String
    }
  ]
});

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;