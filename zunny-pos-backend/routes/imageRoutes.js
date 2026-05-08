const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");

const UPLOAD_DIR = path.resolve(__dirname, "../public/images/products");

// Sanitize filename to prevent path traversal
function safeFilename(originalName) {
  return path.basename(originalName).replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safe = safeFilename(file.originalname);
    const ext = path.extname(safe);
    cb(null, `product-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WEBP, or GIF images are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Upload image — requires admin auth (acts as CSRF protection via JWT)
router.post("/upload/:productId", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Validate saved file is within the upload directory
    const savedPath = path.resolve(UPLOAD_DIR, req.file.filename);
    if (!savedPath.startsWith(UPLOAD_DIR)) {
      fs.unlinkSync(savedPath);
      return res.status(400).json({ message: "Invalid file path" });
    }

    const imagePath = `/images/products/${req.file.filename}`;
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { image: imagePath },
      { new: true }
    );

    if (!product) {
      fs.unlinkSync(savedPath);
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Image uploaded successfully", product, imagePath });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
});

// Get all products with images
router.get("/with-images", async (req, res) => {
  try {
    const products = await Product.find({ image: { $exists: true, $ne: null } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

module.exports = router;
