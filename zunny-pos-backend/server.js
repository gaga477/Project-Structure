// Load .env file if it exists (local dev), Render injects env vars directly
try {
  require("dotenv").config({ path: require("path").join(__dirname, "config/.env") });
} catch (e) {}

if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL is not set. Please add it to your environment variables.");
  process.exit(1);
}
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// Health check route
app.get("/health", (req, res) => res.json({ status: "ok", mongodb: "connected" }));

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve JS libraries
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Serve service worker with correct headers
app.get('/sw.js', (req, res) => {
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'public/sw.js'));
});

// Serve manifest
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/manifest.json'));
});

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend client
app.use(express.static(path.join(__dirname, "../client")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));

// Also support routes without /api prefix (for Render frontend calls)
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/sales", require("./routes/salesRoutes"));

// Global error handler — returns JSON so we can see the actual error
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ error: err.message });
});

// Fallback — serve index.html for all unmatched routes
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "../client/index.html");
  res.sendFile(indexPath, (err) => {
    if (err) res.status(404).json({ error: "Not found" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
