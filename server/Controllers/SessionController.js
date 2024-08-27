const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Session = require("../Models/SessionModel.js");

exports.startSession = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Fetch user data by username
    const user = await Session.findByUsername(username);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare provided password with hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Check password match
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create session token (JWT)
    const sessionToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.WEB_SECRET,
      { expiresIn: "24h" }
    );

    // Respond with user data and session token
    res.json({
      user,
      sessionToken,
    });
  } catch (error) {
    console.error("Error starting session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to handle sign-out
exports.signOut = async (req, res) => {
  // Assuming you're using sessions
  await req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to sign out" });
    }

    res.status(200).json({ message: "Signed out successfully" });
  });
};
