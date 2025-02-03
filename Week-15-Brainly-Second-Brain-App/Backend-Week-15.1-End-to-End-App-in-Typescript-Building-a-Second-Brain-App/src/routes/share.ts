// src/routes/share.ts
import { Router } from "express";
import { LinkModel, ContentModel, UserModel } from "../db";
import { random } from "../utils";
const { userMiddleware } = require("../middleware");

const router = Router();


// Route 6: Share Content Link
router.post("/share", userMiddleware, async (req, res) => {
  const { share } = req.body;
  if (share) {
    const existingLink = await LinkModel.findOne({ userId: req.userId });
    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }
    const hash = random(10);
    await LinkModel.create({ userId: req.userId, hash });
    res.json({ hash });
  } else {
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Removed link" });
  }
});

// Route 7: Get Shared Content
router.get("/:shareLink", userMiddleware, async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({ hash });
  if (!link) {
    res.status(404).json({ message: "Invalid share link" });
    return;
  }

  const [content, user] = await Promise.all([
    ContentModel.find({ userId: link.userId }),
    UserModel.findById(link.userId),
  ]);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ username: user.username, content });
});

export default router;