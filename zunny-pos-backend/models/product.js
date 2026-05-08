const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,      // 💰 Selling price
  costPrice: Number,  // 📦 Cost price
  stock: Number,
  barcode: String,
  image: String,      // 🖼️ Image URL or path
  category: String    // 📂 Product category
});

module.exports = mongoose.model("Product", productSchema);
