const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});