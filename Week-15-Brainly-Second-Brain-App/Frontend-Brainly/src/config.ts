// config.ts
import dotenv from 'dotenv';

dotenv.config();

// Validate critical environment variables
if (!process.env.BACKEND_URL) {
  throw new Error("Missing MONGODB_URL environment variable");
}
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("Missing JWT_SECRET_KEY environment variable");
}

export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const BACKEND_URL = process.env.BACKEND_URL;