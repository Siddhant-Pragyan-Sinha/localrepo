"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_URI = exports.JWT_SECRET = void 0;
// config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Validate critical environment variables
if (!process.env.BACKEND_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
}
if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Missing JWT_SECRET_KEY environment variable");
}
exports.JWT_SECRET = process.env.JWT_SECRET_KEY;
exports.BACKEND_URI = process.env.BACKEND_URI;
