"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.JWT_SECRET = exports.MONGODB_URI = void 0;
// config.ts
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env.development or .env.production based on NODE_ENV
const envPath = `.env.${process.env.NODE_ENV || "development"}`;
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), envPath) });
// Validate environment variables
if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
}
if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Missing JWT_SECRET_KEY environment variable");
}
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.JWT_SECRET = process.env.JWT_SECRET_KEY;
exports.MONGO_URI = process.env.MONGO_URI;
