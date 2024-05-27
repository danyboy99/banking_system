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

router.get("/", (req: Request, res: Response) => {
  return res.json("welcome to 99 banking system client index route");
});

router.post("/createclient", createClient);

router.post("/login", login);

router.post("/createtransaction/", signClientToken, createTransaction);

router.get("/getalltransac", signClientToken, getAllUserTransaction);

export { router as ClientRoutes };
