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
router.get("/growth", authMiddleware, async (req, res) => {
  try{
    console.log("User ID from token:", req.userId);
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const { exp, health, level } = user.growth;
    console.log("User growth:", user.growth);

    res.json({ success: true, message: "Growth saved successfully", exp, health, level });

  }catch(err){
    console.error("Error in /growth:", err);
    res.status(500).json({ success: false, message: "Server error saving questionnaire" });
  }
});
// Update growth stats (exp, health, level)
router.put("/growth", authMiddleware, async (req, res) => {
  try {
    const { exp, health, level } = req.body;
    const user = await User.findById(req.userId);
    console.log("User growth updated:", user.growth);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // If user.growth doesn't exist, initialize it
    if (!user.growth) {
      user.growth = { exp: 0, health: 0, level: 0 };
    }
    if (exp !== undefined) user.growth.exp = exp;
    if (health !== undefined) user.growth.health = health;
    if (level !== undefined) user.growth.level = level;
    
    await user.save();
    res.json({ success: true, message: "Growth updated successfully", exp: user.growth.exp, health: user.growth.health, level: user.growth.level });
  } catch (err) {
    console.error("Error in PUT /growth:", err);
    res.status(500).json({ success: false, message: "Server error updating growth" });
  }
});


module.exports = router;
