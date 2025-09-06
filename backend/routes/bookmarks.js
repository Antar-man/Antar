import express from "express";
import Bookmark from "../models/Bookmark.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// POST → Add bookmark
router.post("/", authMiddleware, async (req, res) => {
  try {
    const bookmark = new Bookmark({
      user: req.user.id,
      resource: req.body.resourceId
    });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET → Fetch user bookmarks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).populate("resource");
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE → Remove bookmark
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: "Bookmark removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
