const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");

// Get all products (with optional search)
router.get("/", async (req, res) => {
  const { search } = req.query;
  const filter = search ? { name: { $regex: search, $options: "i" } } : {};
  const products = await Product.find(filter);
  res.json(products);
});

// Get product by barcode
router.get("/barcode/:code", async (req, res) => {
  const product = await Product.findOne({ barcode: req.params.code });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// Add product — admin only (JWT acts as CSRF protection)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  try {
    const { name, price, costPrice, stock, barcode, image, category } = req.body;
    const product = new Product({ name, price, costPrice, stock, barcode, image, category });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});

// Update product — admin only
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  try {
    const { name, price, costPrice, stock, barcode, image, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, costPrice, stock, barcode, image, category },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

// Delete product — admin only
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

module.exports = router;
