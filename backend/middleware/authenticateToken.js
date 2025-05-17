const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(" Received Token:", token); 

      if (!JWT_SECRET) {
        return res.status(500).json({ message: "Server error: JWT_SECRET is not defined" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(" Decoded Token:", decoded);

     
      req.user = decoded;

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(401).json({ message: "Not authorized, token failed" });
      }
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
module.exports = { protect };