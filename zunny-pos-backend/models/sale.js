const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  profit: Number,
  offlineId: { type: String, default: null },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sale", saleSchema);
