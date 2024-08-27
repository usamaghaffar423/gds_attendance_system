const db = require("../Config/db");

exports.findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    // Fix the SQL query: only filter by username
    const query = "SELECT * FROM employees WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length > 0 ? results[0] : null); // Return null if no user is found
      }
    });
  });
};

// Optionally, you can add a method for finding users by CNIC last 6 digits if needed
exports.findByCnic = (cnic_last6) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM employees WHERE cnic_last6 = ?";
    db.query(query, [cnic_last6], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length > 0 ? results[0] : null);
      }
    });
  });
};
