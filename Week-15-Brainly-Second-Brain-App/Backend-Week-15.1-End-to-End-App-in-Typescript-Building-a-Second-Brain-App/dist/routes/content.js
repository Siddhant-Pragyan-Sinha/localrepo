"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/content.ts
const express_1 = require("express");
const db_1 = require("../db");
const { userMiddleware } = require("../middleware");
const router = (0, express_1.Router)(); // Applying userMiddleware to the router
// Route 3: Add Content
router.post("/", userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    yield db_1.ContentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: [],
    });
    res.json({ message: "Content added" });
}));
// Route 4: Get User Content
router.get("/", userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield db_1.ContentModel.find({ userId: req.userId }).populate("userId", "username");
    res.json(content);
}));
// Route 5: Delete User Content
router.delete("/", userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    yield db_1.ContentModel.deleteOne({ _id: contentId, userId: req.userId });
    res.json({ message: "Deleted" });
}));
exports.default = router;
// Apply userMiddleware to specific routes
//router.post("/", userMiddleware, async (req, res) => { /* ... */ });
//router.get("/", userMiddleware, async (req, res) => { /* ... */ });
//router.delete("/", userMiddleware, async (req, res) => { /* ... */ });
