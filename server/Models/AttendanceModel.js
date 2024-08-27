const db = require("../Config/db");

const Attendance = {
  // Check if attendance has been recorded for a specific employee on a specific date
  findByCnicAndDate: (cnicLast6, date, callback) => {
    const query = "SELECT * FROM attendance WHERE cnic_last6 = ? AND date = ?";
    db.query(query, [cnicLast6, date], callback);
  },

  // Create a new attendance record
  create: (attendanceData, callback) => {
    const { cnic_last6, date, location, ipAddress, timestamp, username } =
      attendanceData;
    const query =
      "INSERT INTO attendance (cnic_last6, date, location, ipAddress, timestamp, username) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        cnic_last6,
        date,
        JSON.stringify(location),
        ipAddress,
        timestamp,
        username,
      ], // Convert location to JSON string
      callback
    );
  },

  // Retrieve all attendance records
  findAll: (callback) => {
    const query =
      "SELECT * FROM attendance ORDER BY username, date DESC, timestamp DESC";
    db.query(query, callback);
  },

  // Retrieve attendance records for a specific username
  findByUsername: (username, callback) => {
    const query =
      "SELECT * FROM attendance WHERE username = ? ORDER BY date DESC, timestamp DESC";
    db.query(query, [username], callback);
  },

  // Retrieve attendance records for a specific cnicLast6
  findByCnicLast6: (cnic_last6, callback) => {
    const query =
      "SELECT * FROM attendance WHERE cnic_last6 = ? ORDER BY date DESC, timestamp DESC";
    db.query(query, [cnic_last6], callback);
  },
};

module.exports = Attendance;
