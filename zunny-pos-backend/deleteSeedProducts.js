const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect(process.env.MONGODB_URL).then(async () => {
  const all = await Product.find({}).lean();
  const seedPattern = /^[A-Z0-9]{3,10}$/;
  const seedIds = all.filter(p => !p.barcode || seedPattern.test(p.barcode)).map(p => p._id);
  console.log('Seed products to delete:', seedIds.length);
  const result = await Product.deleteMany({ _id: { $in: seedIds } });
  console.log('Deleted:', result.deletedCount);
  const remaining = await Product.countDocuments();
  console.log('Remaining (admin-added):', remaining);
  mongoose.connection.close();
});
