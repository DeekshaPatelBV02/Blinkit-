const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mobile: String,
  otp: String,
  otpExpiry: Date
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
