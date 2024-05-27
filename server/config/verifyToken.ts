import jwt from "jsonwebtoken";
import { jwt_secret } from "./keys";
import Client from "../services/client";
import Banker from "../services/banker";
import { NextFunction, Request, Response } from "express";

export const signClientToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization = "" } = req.headers;
    const decoded: any = jwt.verify(authorization, jwt_secret);

    const foundId = decoded.user;

    const currentClient = await Client.findOneById(foundId);

    if (!currentClient) {
      return res.json({
        status: "failed!",
        msg: "user not authorized!!",
      });
    }

    req.user = currentClient;

    return next();
  } catch (err: any) {
    return res.json(err.message);
  }
};

export const signBankerToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization = "" } = req.headers;
    const decoded: any = jwt.verify(authorization, jwt_secret);
    if (!decoded) {
      return res.json({
        status: "failed!",
        msg: "user not authorized or you entered an expired token try generating a new one",
      });
    }
    const foundId = decoded.user;

    const currentBanker = await Banker.findOneById(foundId);

    if (!currentBanker) {
      return res.json({
        status: "failed!",
        msg: "user not authorized!!",
      });
    }

    req.user = currentBanker;

    return next();
  } catch (err: any) {
    return res.json(err.message);
  }
};
