import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Profile
router.get("/", authMiddleware, async (req, res) => {
  res.json(req.user);
});

// Bookmarks
router.get("/bookmarks", authMiddleware, async (req, res, next) => {
  try {
    await req.user.populate("bookmarks");
    res.json(req.user.bookmarks);
  } catch (err) {
    next(err);
  }
});

router.post("/bookmarks/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!req.user.bookmarks.includes(req.params.id)) {
      req.user.bookmarks.push(req.params.id);
      await req.user.save();
    }
    res.json({ message: "Bookmarked" });
  } catch (err) {
    next(err);
  }
});

router.delete("/bookmarks/:id", authMiddleware, async (req, res, next) => {
  try {
    req.user.bookmarks = req.user.bookmarks.filter(
      (b) => b.toString() !== req.params.id
    );
    await req.user.save();
    res.json({ message: "Removed" });
  } catch (err) {
    next(err);
  }
});

// Progress
router.get("/progress", authMiddleware, async (req, res) => {
  res.json(req.user.progress);
});

router.post("/progress/:id", authMiddleware, async (req, res, next) => {
  try {
    const { status, secondsListened } = req.body;
    let progress = req.user.progress.find(
      (p) => p.resourceId.toString() === req.params.id
    );
    if (!progress) {
      req.user.progress.push({ resourceId: req.params.id, status, secondsListened });
    } else {
      if (status) progress.status = status;
      if (secondsListened !== undefined) progress.secondsListened = secondsListened;
    }
    await req.user.save();
    res.json({ message: "Progress updated" });
  } catch (err) {
    next(err);
  }
});

export default router;
