const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"]; 
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    console.log(" No token provided. Proceeding as guest.");
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    console.log(" optionalAuth - Authenticated user:", decoded.userId);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Invalid token. Proceeding as guest.");
    next();
  }
};

module.exports = { optionalAuth };
