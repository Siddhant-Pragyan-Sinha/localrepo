// src/routes/content.ts
import { Router } from "express";
import { ContentModel } from "../db";
const { userMiddleware } = require("../middleware");

const router = Router(); // Applying userMiddleware to the router



// Route 3: Add Content
router.post("/", userMiddleware, async (req, res) => {
  const { link, type, title } = req.body;
  await ContentModel.create({
    link,
    type,
    title,
    userId: req.userId,
    tags: [],
  });
  res.json({ message: "Content added" });
});

// Route 4: Get User Content
router.get("/", userMiddleware, async (req, res) => {
  const content = await ContentModel.find({ userId: req.userId }).populate(
    "userId",
    "username"
  );
  res.json(content);
});

// Route 5: Delete User Content
router.delete("/", userMiddleware, async (req, res) => {
  const { contentId } = req.body;
  await ContentModel.deleteOne({ _id: contentId, userId: req.userId });
  res.json({ message: "Deleted" });
});

export default router;

// Apply userMiddleware to specific routes
//router.post("/", userMiddleware, async (req, res) => { /* ... */ });
//router.get("/", userMiddleware, async (req, res) => { /* ... */ });
//router.delete("/", userMiddleware, async (req, res) => { /* ... */ });