// JWT token verification middleware for authentication
import jwt from "jsonwebtoken";
import { jwt_secret } from "./keys";
import Client from "../services/client";
import Banker from "../services/banker";
import { NextFunction, Request, Response } from "express";

// Middleware to verify client JWT tokens
export const signClientToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from authorization header
    const { authorization = "" } = req.headers;
    const decoded: any = jwt.verify(authorization, jwt_secret);

    const foundId = decoded.user;

    // Find client by decoded user ID
    const currentClient = await Client.findOneById(foundId);

    if (!currentClient) {
      return res.json({
        status: "failed!",
        msg: "user not authorized!!",
      });
    }

    // Attach user to request object
    req.user = currentClient;

    return next();
  } catch (err: any) {
    return res.json(err.message);
  }
};

// Middleware to verify banker JWT tokens
export const signBankerToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from authorization header
    const { authorization = "" } = req.headers;
    const decoded: any = jwt.verify(authorization, jwt_secret);

    if (!decoded) {
      return res.json({
        status: "failed!",
        msg: "user not authorized or you entered an expired token try generating a new one",
      });
    }

    const foundId = decoded.user;

    // Find banker by decoded user ID
    const currentBanker = await Banker.findOneById(foundId);

    if (!currentBanker) {
      return res.json({
        status: "failed!",
        msg: "user not authorized!!",
      });
    }

    // Attach user to request object
    req.user = currentBanker;

    return next();
  } catch (err: any) {
    return res.json(err.message);
  }
};
