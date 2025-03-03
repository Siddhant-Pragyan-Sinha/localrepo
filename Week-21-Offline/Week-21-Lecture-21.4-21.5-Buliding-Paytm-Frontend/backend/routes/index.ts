// backend/routes/index.ts
import express from 'express';
const userRouter = require("./user");

const router = express.Router();

router.use("/user", userRouter);

module.exports = router;