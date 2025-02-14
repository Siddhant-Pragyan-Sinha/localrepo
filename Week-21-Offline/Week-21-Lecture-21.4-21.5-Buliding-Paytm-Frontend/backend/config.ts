// config.ts
import dotenv from "dotenv";
import path from "path";

// Load .env.development or .env.production based on NODE_ENV
const envPath = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: path.resolve(process.cwd(), envPath) });

// Validate environment variables
if (!process.env.MONGO_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("Missing JWT_SECRET_KEY environment variable");
}
if (!process.env.PORT) {
  throw new Error("Missing PORT environment variable");
}

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const MONGO_URI = process.env.MONGO_URI;