const fs = require("fs");
const path = require("path");

// Load .env from workspace root if present, otherwise use backend config/.env
let envPath = null;
try {
  const rootEnv = path.join(__dirname, "../.env");
  const localEnv = path.join(__dirname, "config/.env");
  envPath = fs.existsSync(rootEnv) ? rootEnv : localEnv;
  const result = require("dotenv").config({ path: envPath });
  if (result.error) throw result.error;
  console.log(`Loaded environment variables from ${envPath}`);
} catch (e) {
  console.warn("Could not load .env file:", e && e.message ? e.message : e);
}

if (!process.env.MONGODB_URL && !process.env.MONGODB_URI) {
  console.warn("⚠️  MONGODB_URL or MONGODB_URI is not set. DB connection will likely fail.");
} else {
  console.log("MongoDB connection string present (hidden).");
}
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

const DEFAULT_ADMIN_USERNAME = process.env.DEFAULT_ADMIN_USERNAME || "admin";
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";
const DEFAULT_ADMIN_ROLE = process.env.DEFAULT_ADMIN_ROLE || "admin";

async function ensureDefaultAdmin() {
  try {
    const adminExists = await User.findOne({ username: DEFAULT_ADMIN_USERNAME });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
      await User.create({ username: DEFAULT_ADMIN_USERNAME, password: hashedPassword, role: DEFAULT_ADMIN_ROLE });
      console.log(`Created default admin user: ${DEFAULT_ADMIN_USERNAME}`);
    }

    const cashierExists = await User.findOne({ username: "cashier1" });
    if (!cashierExists) {
      const hashedPassword = await bcrypt.hash("cashier123", 10);
      await User.create({ username: "cashier1", password: hashedPassword, role: "cashier" });
      console.log("Created cashier user: cashier1 / cashier123");
    }
  } catch (err) {
    console.error("Error ensuring default admin:", err.message || err);
  }
}

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// Simple request/response logger to help debug 4xx/5xx responses
app.use((req, res, next) => {
  const start = Date.now();
  const chunks = [];

  const _write = res.write;
  const _end = res.end;

  res.write = function (chunk) {
    try { chunks.push(Buffer.from(chunk)); } catch (e) {}
    return _write.apply(res, arguments);
  };

  res.end = function (chunk) {
    try { if (chunk) chunks.push(Buffer.from(chunk)); } catch (e) {}
    return _end.apply(res, arguments);
  };

  res.on("finish", () => {
    const ms = Date.now() - start;
    const respBody = Buffer.concat(chunks).toString("utf8");
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
    if (res.statusCode >= 400) {
      console.log("--- REQUEST BODY ---", req.method === "GET" ? "(empty)" : JSON.stringify(req.body || {}));
      console.log("--- RESPONSE BODY ---", respBody || "(empty)");
    }
  });

  next();
});

// Async error wrapper — catches unhandled errors in async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Health check route
app.get("/health", (req, res) => res.json({ status: "ok", mongodb: "connected" }));

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve JS libraries
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Serve icons
app.use('/icons', express.static(path.join(__dirname, 'public/icons')));

// Serve manifest
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json');
  res.sendFile(path.join(__dirname, 'public/manifest.json'));
});

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

// Temporary debug endpoint
const Product = require("./models/product");
app.get("/api/debug-products", async (req, res) => {
  try {
    const db = mongoose.connection.db ? mongoose.connection.db.databaseName : "not connected";
    const count = await Product.countDocuments();
    const one = await Product.findOne();
    res.json({ database: db, count, sample: one });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));

// Also support routes without /api prefix (for Render frontend calls)
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/sales", require("./routes/salesRoutes"));

// Global error handler — catches Mongoose and other errors gracefully
app.use((err, req, res, next) => {
  console.error("Error:", err.name, "-", err.message);
  
  // Handle Mongoose buffer timeout or connection errors
  if (err.name === "MongooseError" || err.code === "ECONNREFUSED") {
    return res.status(503).json({ 
      error: "Database unavailable", 
      message: "The database connection is currently unavailable. Please try again later."
    });
  }
  
  res.status(500).json({ 
    error: err.message || "Internal server error" 
  });
});

// Fallback — serve index.html for all unmatched routes
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "../client/index.html");
  res.sendFile(indexPath, (err) => {
    if (err) res.status(404).json({ error: "Not found" });
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    await ensureDefaultAdmin();
  } catch (err) {
    console.error("Database startup issue:", err.message || err);
    process.exit(1);
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Don't exit - let the server continue
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Don't exit - let the server continue
});
