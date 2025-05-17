const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // ✅ lowercase
  const token = authHeader && authHeader.split(" ")[1]; // ✅ "Bearer <token>"

  if (!token) {
    console.log("🔓 No token provided. Proceeding as guest.");
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "legallyhersSuperSecret123");
    console.log("🛡️ optionalAuth - Authenticated user:", decoded.userId);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Invalid token. Proceeding as guest.");
    next();
  }
};

module.exports = { optionalAuth };
