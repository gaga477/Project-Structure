const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "cashier"],
    default: "cashier"
  }
});

module.exports = mongoose.model("User", userSchema);