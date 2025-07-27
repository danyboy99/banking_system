// Client routes - defines API endpoints for client operations
import express, { Request, Response } from "express";
import {
  createClient,
  createTransaction,
  getAllTransac,
  getAllUserTransaction,
  login,
} from "../controller/Client";
import { signClientToken } from "../config/verifyToken";

const router = express.Router();

// Client index route
router.get("/", (req: Request, res: Response) => {
  return res.json("welcome to 99 banking system client index route");
});

// Create new client account
router.post("/createclient", createClient);

// Client login
router.post("/login", login);

// Create transaction (protected route)
router.post("/createtransaction/", signClientToken, createTransaction);

// Get all client transactions (protected route)
router.get("/getalltransac", signClientToken, getAllUserTransaction);

export { router as ClientRoutes };
