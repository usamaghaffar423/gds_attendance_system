const express = require("express");
const router = express.Router();
const sessionController = require("../Controllers/SessionController");

// Route to start a new session
router.post("/start-session", sessionController.startSession);

router.post("/signout", sessionController.signOut);

module.exports = router;
