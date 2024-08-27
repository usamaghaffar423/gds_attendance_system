// middleware/auth.js
const db = require("../Config/db");

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const { username } = req.body;

  const query = "SELECT role FROM employees WHERE role = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (results[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }

    next();
  });
};

// Middleware to check if the user is an employee
const isEmployee = (req, res, next) => {
  const { username } = req.body;

  const query = "SELECT role FROM employees WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (results[0].role !== "employee") {
      return res.status(403).json({ error: "Access denied: Employees only" });
    }

    next();
  });
};

module.exports = { isAdmin, isEmployee };
