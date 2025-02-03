// src/routes/auth.ts
import { Router } from "express";
import { UserModel } from "../db";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

const router = Router();

// Route 1: User Signup
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        await UserModel.create({ username, password });
        res.json({ message: "User signed up" });
    } catch (e) {
        res.status(409).json({ message: "User already exists" });
    }
});

// Route 2: User Signin
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

export default router;