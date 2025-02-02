// config.ts

// For frontend variables (Vite automatically injects them via import.meta.env)
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_JWT_SECRET = import.meta.env.VITE_JWT_SECRET_KEY;


// For backend variables (if using Node.js, handled via dotenv)
// const BACKEND_URL = process.env.BACKEND_URL;
// const JWT_SECRET = process.env.JWT_SECRET;

// Validate critical environment variables
if (!VITE_BACKEND_URL) {
  throw new Error("Missing VITE_BACKEND_URL environment variable");
}
if (!VITE_JWT_SECRET) {
  throw new Error("Missing VITE_JWT_SECRET environment variable");
}

export const JWT_SECRET = VITE_JWT_SECRET;
export const BACKEND_URL = VITE_BACKEND_URL;