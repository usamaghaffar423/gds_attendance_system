// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sessionMiddleware = require("./Middlewares/session");
const employeeRoutes = require("./Routes/employeeRoutes");
const attendanceRoutes = require("./Routes/attendanceRoutes");
const sessionRoutes = require("./Routes/sessionRoutes");

const app = express();

// Define the home route
app.get("/", (req, res) => {
  res.send("Hello World");
});

const allowedOrigins = [
  "https://gds-attendance-system-client.vercel.app/",
  "http://localhost:3000", // For local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins array
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());
app.use(express.json);
app.use(bodyParser.json());
app.use(sessionMiddleware);

// Routes
app.use("/api", employeeRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", sessionRoutes);

module.exports = app;
