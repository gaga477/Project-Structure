const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL || process.env.MONGO_URI;

  try {
    console.log("Connecting to MongoDB...");
    console.log("Mongoose version:", mongoose.version);
    console.log("MONGO URI:", uri ? "(hidden)" : undefined);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("FULL ERROR:");
    console.error(error);
    throw error;
  }
};

module.exports = connectDB;

