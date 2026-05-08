const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "zunny_secret_key";

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
};
