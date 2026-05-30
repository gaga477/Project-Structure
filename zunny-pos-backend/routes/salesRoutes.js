const router = require("express").Router();
const Sale = require("../models/sale");
const Product = require("../models/product");
const auth = require("../middleware/auth");

// Create sale + deduct stock
router.post("/", auth, async (req, res) => {
  try {
    const { items, total, offlineId, date } = req.body;

    // Duplicate check — return existing sale if offlineId already exists
    if (offlineId) {
      const existing = await Sale.findOne({ offlineId });
      if (existing) {
        return res.json(existing);
      }
    }

    let profit = 0;

    // Deduct stock
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) continue;
      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `${product.name} has insufficient stock`
        });
      }
      product.stock -= item.qty;
      profit += (product.price - (product.costPrice || 0)) * item.qty;
      await product.save();
    }

    const margin = total > 0 ? ((profit / total) * 100).toFixed(2) : 0;

    // Save sale
    const sale = new Sale({ items, total, profit, offlineId: offlineId || null, date: date || Date.now() });
    await sale.save();

    res.json({ message: "Sale completed", sale, margin: `${margin}%` });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📊 Get daily sales summary
router.get("/report", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  try {
    const { start, end } = req.query;

    const match = {};

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (/^\d{4}-\d{2}-\d{2}$/.test(end)) {
        endDate.setHours(23, 59, 59, 999);
      }
      match.date = {
        $gte: startDate,
        $lte: endDate
      };
    }

    const report = await Sale.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$date" },
            month: { $month: "$date" },
            year: { $year: "$date" }
          },
          totalSales: { $sum: "$total" },
          totalProfit: { $sum: "$profit" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📈 Today's performance
router.get("/today-performance", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const sales = await Sale.find({
      date: {
        $gte: start,
        $lte: end
      }
    });

    const transactionsToday = sales.length;
    const revenueToday = sales.reduce((sum, sale) => sum + (sale.total || 0), 0);
    const profitToday = sales.reduce((sum, sale) => sum + (sale.profit || 0), 0);
    const profitMargin = revenueToday > 0 ? ((profitToday / revenueToday) * 100).toFixed(2) : 0;

    res.json({
      transactionsToday,
      revenueToday,
      profitToday,
      profitMargin
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🧾 Get all sales
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
