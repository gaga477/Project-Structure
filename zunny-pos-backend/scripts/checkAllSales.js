/**
 * Check all sales in the database
 * Usage: node scripts/checkAllSales.js
 */
const path = require("path");
const fs = require("fs");
const rootEnv = path.join(__dirname, "../../.env");
const localEnv = path.join(__dirname, "../config/.env");
require("dotenv").config({ path: fs.existsSync(rootEnv) ? rootEnv : localEnv });

const mongoose = require("mongoose");
const Sale = require("../models/sale");

async function check() {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  await mongoose.connect(uri, { dbName: "ZunnyMinMart" });
  console.log("Connected. Database:", mongoose.connection.db.databaseName);

  const sales = await Sale.find().sort({ date: 1 }).lean();
  console.log(`\nTotal sales in database: ${sales.length}\n`);

  sales.forEach((s, i) => {
    const d = new Date(s.date).toLocaleString("en-NG", { timeZone: "Africa/Lagos" });
    const items = (s.items || []).map(i => `${i.name} x${i.qty}`).join(", ");
    console.log(`[${i+1}] ${d} | ₦${s.total} | ${s.cashier || "cashier"} | ${items}`);
  });

  await mongoose.disconnect();
}

check().catch(e => { console.error(e); process.exit(1); });
