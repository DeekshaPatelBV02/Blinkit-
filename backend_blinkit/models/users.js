const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  otp: String,
  otpExpiry: Date
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;