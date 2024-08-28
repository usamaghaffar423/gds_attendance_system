// middleware/session.js
const session = require("express-session");

const sessionMiddleware = session({
  secret: "SECRET123",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
});

module.exports = sessionMiddleware;
