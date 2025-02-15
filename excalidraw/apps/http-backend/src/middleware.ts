
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

// Extend Express's Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Define a custom payload type extending the JWT payload
interface CustomJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";

  try {
    // Cast the result to our custom payload type
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    if (decoded && decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(403).json({
        message: "Unauthorized"
      });
    }
  } catch (error : any) {
    res.status(404).json({
      message: "Error validating user" + error.message
    });
  }
}
