// Banker routes - defines API endpoints for banker operations
import express, { Request, Response } from "express";
import {
  allMyUserTransaction,
  createBankers,
  getAllBankers,
  getAllTransac,
  getAllUser,
  login,
} from "../controller/banker";
import { signBankerToken } from "../config/verifyToken";
import { createClient } from "../controller/Client";

const router = express.Router();

// Banker index route
router.get("/", (req: Request, res: Response) => {
  return res.json("welcome to 99 banking system bankers index route");
});

// Create new banker account (protected route)
router.post("/createbanker", signBankerToken, createBankers);

// Get all client transactions
router.get("/clienttransac", getAllTransac);

// Create client account (protected route)
router.post("/createclient", signBankerToken, createClient);

// Get transactions for banker's managed clients
router.get("/getmyusertransaction", allMyUserTransaction);

// Banker login
router.post("/login", login);

// Get all bankers
router.get("/getallbanker", getAllBankers);

// Get all clients
router.get("/getallclient", getAllUser);

export { router as bankersRoutes };
