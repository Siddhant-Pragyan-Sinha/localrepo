"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const auth_1 = __importDefault(require("./routes/auth"));
const content_1 = __importDefault(require("./routes/content"));
const share_1 = __importDefault(require("./routes/share"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mount routes
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/content", content_1.default);
app.use("/api/v1/brain", share_1.default);
// Health check endpoint
app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ok" });
});
// Error handling
app.use(middleware_1.errorHandler);
app.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT}`);
});
