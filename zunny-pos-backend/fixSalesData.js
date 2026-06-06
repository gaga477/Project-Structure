const mongoose = require("mongoose");
const Sale = require("./models/sale");
require("./config/db");

/**
 * This script fixes sales records with null or invalid dates.
 * All sales without a valid date will be set to the current time.
 */

async function fixSalesData() {
  try {
    console.log("🔧 Starting sales data repair...");

    // Find all sales with null or missing dates
    const invalidSales = await Sale.find({
      $or: [
        { date: null },
        { date: undefined },
        { date: { $type: "null" } }
      ]
    });

    console.log(`Found ${invalidSales.length} sales with invalid dates`);

    if (invalidSales.length > 0) {
      // Update all invalid dates to current time
      const result = await Sale.updateMany(
        {
          $or: [
            { date: null },
            { date: undefined },
            { date: { $type: "null" } }
          ]
        },
        { $set: { date: new Date() } }
      );

      console.log(`✅ Fixed ${result.modifiedCount} sales records`);
    }

    // Verify all sales now have dates
    const stillInvalid = await Sale.countDocuments({
      $or: [
        { date: null },
        { date: undefined }
      ]
    });

    if (stillInvalid === 0) {
      console.log("✨ All sales now have valid dates!");
    } else {
      console.log(`⚠️  Still found ${stillInvalid} invalid records`);
    }

    // Show sample of fixed data
    const sample = await Sale.find().limit(5).sort({ date: -1 });
    console.log("\n📊 Sample of recent sales:");
    sample.forEach(s => {
      console.log(`  - Total: ₦${s.total}, Profit: ₦${s.profit}, Date: ${s.date}`);
    });

    console.log("\n✅ Sales data repair completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

fixSalesData();
