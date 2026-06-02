const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, {
      bufferCommands: false  // Fail immediately if DB is not connected, don't buffer
    });
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.warn("⚠️  Database is unavailable. Server will run but DB queries will fail.");
    console.warn("Make sure MongoDB connection string is valid and the database is accessible.");
    // Do not exit the process here so the server can start for diagnostic purposes.
    // The app should handle DB unavailability at route-level where appropriate.
  }
};
console.log("MONGODB_URI =", process.env.MONGODB_URI);

module.exports = connectDB;
