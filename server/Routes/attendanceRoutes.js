const express = require("express");
const router = express.Router();
const {
  recordAttendance,
  getAllAttendanceRecords,
  getAttendanceByUsername,
  getAttendanceByCnicLast6,
  checkAttendance,
} = require("../Controllers/AttendanceController");

// Route to record attendance
router.post("/record", recordAttendance);

// Route to check if attendance is already recorded
router.get("/check-attendance", checkAttendance);

// Route to get all attendance records
router.get("/all", getAllAttendanceRecords);

// Route to get attendance by username
router.get("/username/:username", getAttendanceByUsername);

// Route to get attendance by cnicLast6
router.get("/cnic/:cnicLast6", getAttendanceByCnicLast6);

module.exports = router;
