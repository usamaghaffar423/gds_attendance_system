const db = require("../Config/db");

const Employee = {
  // Find employee by username
  findByUsername: (username, callback) => {
    const query = "SELECT * FROM employees WHERE username = ?";
    db.query(query, [username], callback);
  },

  // Create a new employee
  create: (employeeData, callback) => {
    const { username, phoneNumber, designation, role, cnicLast6, password } =
      employeeData;
    const query =
      "INSERT INTO employees (username, phoneNumber, designation, role, cnic_last6, password) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [username, phoneNumber, designation, role, cnicLast6, password],
      callback
    );
  },

  // Get all employees
  findAll: (callback) => {
    const query = "SELECT * FROM employees";
    db.query(query, callback);
  },

  // Find employee by CNIC last 6 digits
  findByCnicLast6: (cnicLast6, callback) => {
    const query = "SELECT * FROM employees WHERE cnic_last6 = ?";
    db.query(query, [cnicLast6], callback);
  },

  // Update employee information
  update: (employeeData, callback) => {
    const { username, phoneNumber, designation, role, cnicLast6, password } =
      employeeData;
    // Update all fields including password if provided
    const query =
      "UPDATE employees SET phoneNumber = ?, designation = ?, role = ?, password = ? WHERE username = ? AND cnic_last6 = ?";
    db.query(
      query,
      [phoneNumber, designation, role, password, username, cnicLast6],
      callback
    );
  },

  // Delete an employee by username
  deleteByUsername: (username, callback) => {
    const query = "DELETE FROM employees WHERE username = ?";
    db.query(query, [username], callback);
  },

  // Delete an employee by CNIC last 6 digits
  deleteByCnicLast6: (cnicLast6, callback) => {
    const query = "DELETE FROM employees WHERE cnic_last6 = ?";
    db.query(query, [cnicLast6], callback);
  },
};

module.exports = Employee;
