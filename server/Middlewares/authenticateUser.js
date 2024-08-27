// authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.WEB_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    // Set the user in the request object
    req.user = { cnic_last6: user.cnic_last6 }; // Assuming the token contains user's CNIC
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticateUser };
