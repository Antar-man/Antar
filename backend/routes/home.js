const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/middleware");

const router = express.Router();

// Protected home
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");//excluse password from response
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Welcome to the home page!", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Save questionnaire answers
router.post("/questions", authMiddleware, async (req, res) => {
  try {
    const { mood, stress, sleepHours } = req.body;
    console.log("Received body:", req.body);
    console.log("User ID from token:", req.userId);

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.questionnaire = { mood, stress, sleepHours };
    await user.save();

    res.json({ success: true, message: "Questionnaire saved successfully" });
  } catch (err) {
    console.error("Error in /questions:", err);
    res.status(500).json({ success: false, message: "Server error saving questionnaire" });
  }
});

module.exports = router;
