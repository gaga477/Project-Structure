require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

connectDB();

// CORS — allow all origins in production (Render)
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5000",
      "http://localhost:3000",
      process.env.CLIENT_URL
    ].filter(Boolean);
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === "production") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

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

// Fallback — serve index.html for all unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
