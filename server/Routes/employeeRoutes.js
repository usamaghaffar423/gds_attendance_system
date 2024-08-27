const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/EmployeeController");
const { isAdmin } = require("../Middlewares/auth.js");

// Route to register a new employee (admin only)
router.post("/register", employeeController.registerEmployee);

// Route to get all employees
router.get("/employees", employeeController.getAllEmployees);

// Route to get an employee by username
router.get(
  "/employees/username/:username",
  employeeController.getEmployeeByUsername
);

// Route to get an employee by CNIC last 6 digits
router.get(
  "/employees/cnic/:cnicLast6",
  employeeController.getEmployeeByCnicLast6
);

// Route to update employee information by username
router.put(
  "/employees/username/:username",
  employeeController.updateEmployeeByUsername
);

// Route to delete an employee by username
router.delete(
  "/employees/username/:username",
  employeeController.deleteEmployeeByUsername
);

// Route to delete an employee by CNIC last 6 digits
router.delete(
  "/employees/cnic/:cnicLast6",
  employeeController.deleteEmployeeByCnicLast6
);

module.exports = router;
