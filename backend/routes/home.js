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

module.exports = router;
