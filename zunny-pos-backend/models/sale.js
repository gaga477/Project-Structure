const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  items: {
    type: Array,
    required: true,
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: "Items array must not be empty"
    }
  },
  total: {
    type: Number,
    required: true,
    min: [0.01, "Total must be greater than 0"]
  },
  profit: {
    type: Number,
    required: true,
    default: 0,
    get: (v) => parseFloat(v || 0).toFixed(2)
  },
  offlineId: { 
    type: String, 
    default: null,
    sparse: true
  },
  date: {
    type: Date,
    default: () => new Date(),
    required: true,
    index: true
  }
}, { timestamps: true });

// Ensure date is always valid
saleSchema.pre('save', function(next) {
  if (!this.date || !(this.date instanceof Date) || isNaN(this.date.getTime())) {
    this.date = new Date();
  }
  next();
});

// Ensure profit is always a number
saleSchema.pre('save', function(next) {
  this.profit = parseFloat(this.profit || 0);
  next();
});

module.exports = mongoose.model("Sale", saleSchema);
