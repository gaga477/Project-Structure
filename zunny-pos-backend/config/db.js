const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  console.log("MONGODB_URI =", process.env.MONGODB_URI);
  console.log("MONGODB_URL =", process.env.MONGODB_URL);

  if (!uri) {
    console.error("❌ No MongoDB connection string found in environment variables.");
    return;
  }

  const tryConnect = async (attempt) => {
    try {
      console.log(`Connecting to MongoDB... (attempt ${attempt})`);
      await mongoose.connect(uri, { dbName: "ZunnyMinMart" });
      console.log("MongoDB Connected ✅");
      console.log("Database:", mongoose.connection.db.databaseName);
    } catch (error) {
      console.error(`MongoDB connection error (attempt ${attempt}):`, error.message);
      if (attempt < 5) {
        const delay = attempt * 3000;
        console.log(`Retrying in ${delay / 1000}s...`);
        setTimeout(() => tryConnect(attempt + 1), delay);
      } else {
        console.warn("⚠️  Could not connect to MongoDB after 5 attempts.");
        console.warn("Check: 1) Internet connection  2) Atlas IP whitelist  3) Correct password in .env");
      }
    }
  };

  tryConnect(1);
};

module.exports = connectDB;
