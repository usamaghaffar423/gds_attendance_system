// middleware/session.js
const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.WEB_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
});

module.exports = sessionMiddleware;
