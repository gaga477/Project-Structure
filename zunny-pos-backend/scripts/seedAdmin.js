const fs = require("fs");
const path = require("path");

const rootEnv = path.join(__dirname, "../.env");
const localEnv = path.join(__dirname, "../config/.env");
const envPath = fs.existsSync(rootEnv) ? rootEnv : localEnv;
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const DEFAULT_ADMIN_USERNAME = process.env.DEFAULT_ADMIN_USERNAME || "admin";
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";
const DEFAULT_ADMIN_ROLE = process.env.DEFAULT_ADMIN_ROLE || "admin";

async function seedAdmin() {
  try {
    await connectDB();

    const adminExists = await User.findOne({ username: DEFAULT_ADMIN_USERNAME });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
      await User.create({
        username: DEFAULT_ADMIN_USERNAME,
        password: hashedPassword,
        role: DEFAULT_ADMIN_ROLE,
      });
      console.log(`Created default admin user: ${DEFAULT_ADMIN_USERNAME}`);
    } else {
      console.log("Admin already exists, skipping.");
    }

    const cashierExists = await User.findOne({ username: "cashier1" });
    if (!cashierExists) {
      const hashedPassword = await bcrypt.hash("cashier123", 10);
      await User.create({ username: "cashier1", password: hashedPassword, role: "cashier" });
      console.log("Created cashier user: cashier1 / cashier123");
    } else {
      console.log("cashier1 already exists, skipping.");
    }
  } catch (err) {
    console.error("Failed to seed users:", err.message || err);
    process.exit(1);
  }
}

seedAdmin().then(() => process.exit(0));
