/**
 * Run once to drop the unique sparse index on offlineId
 * that was causing duplicate sales to be silently rejected.
 *
 * Usage: node scripts/fixOfflineIdIndex.js
 */

const path = require("path");
const fs = require("fs");

// Load .env
const rootEnv = path.join(__dirname, "../../.env");
const localEnv = path.join(__dirname, "../config/.env");
require("dotenv").config({ path: fs.existsSync(rootEnv) ? rootEnv : localEnv });

const mongoose = require("mongoose");

async function fix() {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!uri) { console.error("No MongoDB URI found in .env"); process.exit(1); }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db;
  const collection = db.collection("sales");

  // List existing indexes
  const indexes = await collection.indexes();
  console.log("Current indexes on sales:", indexes.map(i => i.name));

  // Drop the offlineId index if it exists
  const offlineIdIndex = indexes.find(i => i.key && i.key.offlineId !== undefined);
  if (offlineIdIndex) {
    await collection.dropIndex(offlineIdIndex.name);
    console.log(`✅ Dropped index: ${offlineIdIndex.name}`);
  } else {
    console.log("ℹ️  No offlineId index found — nothing to drop");
  }

  await mongoose.disconnect();
  console.log("Done.");
}

fix().catch(err => { console.error(err); process.exit(1); });
