const Attendance = require("../Models/AttendanceModel");

const db = require("../Config/db.js");

// Helper function to find the username by cnicLast6
const findUsernameByCnicLast6 = (cnic_last6, callback) => {
  const query = "SELECT * FROM employees WHERE cnic_last6 = ?";
  db.query(query, [cnic_last6], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0)
      return callback(new Error("Employee not found"), null);
    const username = results[0].username;
    callback(null, username);
  });
};

// Create attendance record
const recordAttendance = (req, res) => {
  const { cnic_last6, location = {}, ipAddress = "Unknown" } = req.body;

  console.log("CNIC Last 6:", cnic_last6);
  console.log("Request Body:", req.body);
  console.log(location, ipAddress);

  // Destructure the location object with default values
  const {
    city = "Unknown",
    country = "Unknown",
    latitude = "Unknown",
    longitude = "Unknown",
  } = location;

  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().split(" ")[0];

  // Find username by cnic_last6
  findUsernameByCnicLast6(cnic_last6, (err, username) => {
    if (err) return res.status(500).json({ error: err.message });

    // Check if attendance has already been recorded for today
    Attendance.findByCnicAndDate(cnic_last6, currentDate, (err, results) => {
      if (err) {
        console.error("Error querying attendance:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // If attendance is already recorded for today, respond with a message
      if (results.length > 0) {
        return res.status(400).json({
          message: "Attendance already recorded for today.",
          date: currentDate,
        });
      }

      // Prepare data for new attendance record
      const attendanceData = {
        cnic_last6,
        location: {
          city,
          country,
          latitude,
          longitude,
        },
        ipAddress: ipAddress,
        date: currentDate,
        timestamp: currentTime,
        username,
      };

      console.log("Attendance Data:", attendanceData);

      // Insert new attendance record
      Attendance.create(attendanceData, (err) => {
        if (err) {
          console.error("Error inserting attendance record:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Attendance Recorded:", attendanceData);

        res.json({
          message: "Attendance recorded",
          data: attendanceData,
          timestamp: currentTime,
          date: currentDate,
        });
      });
    });
  });
};

// Controller to check if attendance is recorded
const checkAttendance = async (req, res) => {
  const { date } = req.query;
  const { cnic_last6 } = req.user; // Assuming you're using some middleware to get the user

  console.log(cnic_last6);

  try {
    const attendance = await Attendance.findOne({ date, cnic_last6 });

    if (attendance) {
      return res.json({ attendanceRecorded: true });
    } else {
      return res.json({ attendanceRecorded: false, cnic_last6 });
    }
  } catch (error) {
    console.error("Error checking attendance:", error);
    res.status(500).json({ message: "Failed to check attendance." });
  }
};

// Get all attendance records
const getAllAttendanceRecords = (req, res) => {
  Attendance.findAll((err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    res.json(results);
  });
};

// Get attendance records by username
const getAttendanceByUsername = (req, res) => {
  const { username } = req.params;

  Attendance.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    res.json(results);
  });
};

// Get attendance records by cnicLast6
const getAttendanceByCnicLast6 = (req, res) => {
  const { cnic_last6 } = req.params;

  Attendance.findByCnicLast6(cnic_last6, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    res.json(results);
  });
};

module.exports = {
  recordAttendance,
  getAllAttendanceRecords,
  getAttendanceByUsername,
  getAttendanceByCnicLast6,
  checkAttendance,
};
