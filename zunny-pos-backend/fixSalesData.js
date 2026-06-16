require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Sale = require("./models/sale");

/**
 * Improved script to fix sales records with missing or invalid `date` fields.
 * Instead of setting all invalid dates to "now" (which skews history), this
 * script will prefer `createdAt` (Mongoose timestamps). If `createdAt` is
 * missing, it will derive a timestamp from the sale's ObjectId.
 */

function objectIdTimestamp(id) {
  try {
    return id.getTimestamp();
  } catch (e) {
    return new Date();
  }
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 60000,
      bufferCommands: true,
      maxPoolSize: 10,
      family: 4
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

async function fixSalesData() {
  try {
    console.log("🔧 Starting improved sales data repair...");

    // Find candidates where `date` is missing, null, or not a BSON date.
    // We include string-typed dates which were likely stored incorrectly.
    const candidates = await Sale.find({
      $or: [
        { date: { $exists: false } },
        { date: null },
        { date: { $type: "string" } }
      ]
    });

    console.log(`Found ${candidates.length} sales with missing/invalid dates`);

    if (candidates.length === 0) {
      console.log("No records need fixing.");
      process.exit(0);
    }

    const bulkOps = candidates.map(sale => {
      const fallback = sale.createdAt || objectIdTimestamp(sale._id) || new Date();
      return {
        updateOne: {
          filter: { _id: sale._id },
          update: { $set: { date: fallback } }
        }
      };
    });

    const result = await Sale.bulkWrite(bulkOps);

    console.log(`✅ Fixed ${result.modifiedCount || result.nModified || 0} sales records`);

    // Show sample of recently-fixed data
    const sample = await Sale.find().limit(5).sort({ date: -1 });
    console.log("\n📊 Sample of recent sales:");
    sample.forEach(s => {
      console.log(`  - Total: ₦${s.total}, Profit: ₦${s.profit}, Date: ${s.date.toISOString()}`);
    });

    console.log("\n✅ Sales data repair completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err && err.message ? err.message : err);
    process.exit(1);
  }
}

(async () => {
  await connectDB();
  await fixSalesData();
})();
