const fs = require("fs");
const path = require("path");

const rootEnv = path.join(__dirname, "../.env");
const localEnv = path.join(__dirname, "../config/.env");
const envPath = fs.existsSync(rootEnv) ? rootEnv : localEnv;
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function seedCashier() {
  try {
    await connectDB();

    const existing = await User.findOne({ username: "cashier1" });
    if (existing) {
      console.log("cashier1 already exists.");
      return;
    }

    const hashed = await bcrypt.hash("cashier123", 10);
    await User.create({ username: "cashier1", password: hashed, role: "cashier" });
    console.log("Created user: cashier1 / cashier123");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

seedCashier().then(() => process.exit(0));
