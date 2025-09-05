import express from "express";
import Resource from "../models/Resource.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public or authenticated users can GET all resources
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

// Admin only: create new resource
router.post("/", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
});

// Admin only: update resource
router.put("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (err) {
    next(err);
  }
});

// Admin only: delete resource
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json({ message: "Resource deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
