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

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json("welcome to 99 banking system bankers index route");
});

router.post("/createbanker", signBankerToken, createBankers);

router.get("/clienttransac", getAllTransac);

router.get("/getmyusertransaction", allMyUserTransaction);

router.post("/login", login);

router.get("/getallbanker", getAllBankers);

router.get("/getallclient", getAllUser);
export { router as bankersRoutes };
