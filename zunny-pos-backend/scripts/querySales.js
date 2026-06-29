/**
 * Query all sales for a specific date
 * Usage: node scripts/querySales.js
 */

const path = require("path");
const fs = require("fs");

const rootEnv = path.join(__dirname, "../../.env");
const localEnv = path.join(__dirname, "../config/.env");
require("dotenv").config({ path: fs.existsSync(rootEnv) ? rootEnv : localEnv });

const mongoose = require("mongoose");
const Sale = require("../models/sale");

async function query() {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!uri) { console.error("No MongoDB URI found in .env"); process.exit(1); }

  await mongoose.connect(uri);

  // June 23 2026 — full day
  const start = new Date("2026-06-23T00:00:00.000Z");
  const end   = new Date("2026-06-23T23:59:59.999Z");

  const sales = await Sale.find({ date: { $gte: start, $lte: end } }).sort({ date: 1 }).lean();

  if (!sales.length) {
    console.log("No sales found for June 23, 2026.");
    await mongoose.disconnect();
    return;
  }

  console.log(`\n===== SALES FOR June 23, 2026 — ${sales.length} transaction(s) =====\n`);

  let grandTotal = 0;

  sales.forEach((sale, i) => {
    const date = new Date(sale.date).toLocaleString("en-NG", { timeZone: "Africa/Lagos" });
    console.log(`--- Transaction #${i + 1} ---`);
    console.log(`  ID       : ${sale._id}`);
    console.log(`  Date     : ${date}`);
    console.log(`  Cashier  : ${sale.cashier || "unknown"}`);
    console.log(`  Items    :`);
    (sale.items || []).forEach(item => {
      console.log(`             ${item.name}  x${item.qty}  @ ₦${(item.price || 0).toLocaleString()}  = ₦${((item.price || 0) * (item.qty || 1)).toLocaleString()}`);
    });
    console.log(`  TOTAL    : ₦${(sale.total || 0).toLocaleString()}`);
    console.log(`  Profit   : ₦${(sale.profit || 0).toLocaleString()}`);
    console.log(`  OfflineId: ${sale.offlineId || "none"}`);
    console.log("");
    grandTotal += sale.total || 0;
  });

  console.log(`===== GRAND TOTAL: ₦${grandTotal.toLocaleString()} across ${sales.length} transaction(s) =====\n`);

  await mongoose.disconnect();
}

query().catch(err => { console.error(err); process.exit(1); });
