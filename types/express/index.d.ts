// TypeScript declaration to extend Express Request interface
import { Request } from "express";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user: any; // User object attached by authentication middleware
    }
  }
}

export {};
