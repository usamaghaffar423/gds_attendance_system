const bcrypt = require("bcrypt");
const Employee = require("../Models/EmployeeModel");

// Hash password
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Create a new employee
const registerEmployee = async (req, res) => {
  const { username, phoneNumber, designation, role, cnicLast6, password } =
    req.body;

  if (role !== "employee" && role !== "admin") {
    return res.status(400).json({ error: "Invalid role selected" });
  }

  try {
    // Check if username already exists
    Employee.findByUsername(username, async (err, results) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
      if (results.length > 0)
        return res.status(409).json({ error: "Username already exists" });

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create new employee
      Employee.create(
        {
          username,
          phoneNumber,
          designation,
          role,
          cnicLast6,
          password: hashedPassword,
        },
        (err) => {
          if (err)
            return res.status(500).json({ error: "Internal Server Error" });
          res.status(201).json({ message: "Employee registered successfully" });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all employees
const getAllEmployees = (req, res) => {
  Employee.findAll((err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.json(results);
  });
};

// Get an employee by username
const getEmployeeByUsername = (req, res) => {
  const { username } = req.params;
  Employee.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (results.length === 0)
      return res.status(404).json({ error: "Employee not found" });
    res.json(results[0]);
  });
};

// Get an employee by CNIC last 6 digits
const getEmployeeByCnicLast6 = (req, res) => {
  const { cnicLast6 } = req.params;
  Employee.findByCnicLast6(cnicLast6, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (results.length === 0)
      return res.status(404).json({ error: "Employee not found" });
    res.json(results[0]);
  });
};

// Update employee information by username
const updateEmployeeByUsername = (req, res) => {
  const { username } = req.params;
  const { phoneNumber, designation, role, cnicLast6, password } = req.body;

  const updateData = { phoneNumber, designation, role, cnicLast6 };

  if (password) {
    // Hash new password if provided
    hashPassword(password)
      .then((hashedPassword) => {
        updateData.password = hashedPassword;

        Employee.update(updateData, (err) => {
          if (err)
            return res.status(500).json({ error: "Internal Server Error" });
          res.json({ message: "Employee updated successfully" });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: "Internal Server Error" });
      });
  } else {
    Employee.update(updateData, (err) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
      res.json({ message: "Employee updated successfully" });
    });
  }
};

// Delete an employee by username
const deleteEmployeeByUsername = (req, res) => {
  const { username } = req.params;
  Employee.deleteByUsername(username, (err) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.json({ message: "Employee deleted successfully" });
  });
};

// Delete an employee by CNIC last 6 digits
const deleteEmployeeByCnicLast6 = (req, res) => {
  const { cnicLast6 } = req.params;
  Employee.deleteByCnicLast6(cnicLast6, (err) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.json({ message: "Employee deleted successfully" });
  });
};

module.exports = {
  registerEmployee,
  getAllEmployees,
  getEmployeeByUsername,
  getEmployeeByCnicLast6,
  updateEmployeeByUsername,
  deleteEmployeeByUsername,
  deleteEmployeeByCnicLast6,
};
