// src/index.ts
import express from "express";
import { PORT } from "./config";
import { userMiddleware, errorHandler } from "./middleware";
import authRouter from "./routes/auth";
import contentRouter from "./routes/content";
import shareRouter from "./routes/share";
import cors from "cors";
import { MONGO_URI} from "./config";


const app = express();
app.use(cors());
app.use(express.json());

// Allow requests from your frontend URL
const corsOptions = {
    origin: MONGO_URI, // Or your production URL
    credentials: true
  };
  
  app.use(cors(corsOptions));

// Mount routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", shareRouter);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ok" });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});