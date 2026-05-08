const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,      // 💰 Selling price
  costPrice: Number,  // 📦 Cost price
  stock: Number,
  barcode: String,
  category: String
});

module.exports = mongoose.model("Product", productSchema);
