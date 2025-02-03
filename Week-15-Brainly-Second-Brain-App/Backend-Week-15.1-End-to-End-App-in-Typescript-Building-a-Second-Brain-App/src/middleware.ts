// Importing required types and modules from "express" and "jsonwebtoken".
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config"; // Importing the JWT secret key from a configuration file.
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for token verification.
import express from "express";



// Middleware to validate user authentication using a JWT token.
export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Extract the "authorization" header from the request.
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({ message: "Missing or invalid authorization header" });
        }
    
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        
        req.userId = decoded.id;
        next();
      } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
};


// Global error handler
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("Error:", err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
    });
  };