// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sessionMiddleware = require("./Middlewares/session");
const employeeRoutes = require("./Routes/employeeRoutes");
const attendanceRoutes = require("./Routes/attendanceRoutes");
const sessionRoutes = require("./Routes/sessionRoutes");

const app = express();

app.use(
  cors({
    origin: "https://gds-attendance-system-client.vercel.app", // Replace with your client-side URL
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.json());
app.use(sessionMiddleware);

// Routes
app.use("/api", employeeRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", sessionRoutes);

module.exports = app;
