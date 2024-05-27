import { Request, Response } from "express";
import Banker from "../services/banker";
import Client from "../services/client";
import Transaction from "../services/transaction";
import argon from "argon2";
import validateLoginInput from "../validate_input/loginInput";
import validateBankerSignup from "../validate_input/bankerSignup";

export const createBankers = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      email,
      card_number,
      employees_number,
      password,
    } = req.body;

    // validate req.body input
    const { error, isValid } = validateBankerSignup(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

    const banker = await Banker.createbanker(
      firstname,
      lastname,
      email,
      card_number,
      employees_number,
      password
    );
    const token = Banker.signToken(banker);
    return res.json({
      status: "success",
      msg: "client created successfuly !!",
      token,
    });
  } catch (err: any) {
    return res.json(err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // validate req.body input
    const { error, isValid } = validateLoginInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
    const foundBanker = await Banker.findByEmail(email);
    if (!foundBanker) {
      return res.json({
        status: "failed",
        msg: "no registered banker with this email !!",
      });
    }

    const verifyPassword = await argon.verify(foundBanker.password, password);
    if (!verifyPassword) {
      return res.json({
        status: "failed",
        msg: "incorrect password",
      });
    }

    const token = Banker.signToken(foundBanker);

    return res.json({
      status: "success",
      msg: "login successful",
      token,
    });
  } catch (err: any) {
    return res.json(err.message);
  }
};

export const getAllBankers = async (req: Request, res: Response) => {
  try {
    const bankers = await Banker.getAll();

    return res.json(bankers);
  } catch (err: any) {
    return res.json(err);
  }
};

export const getAllTransac = async (req: Request, res: Response) => {
  try {
    const allTransac = await Transaction.getAllTransaction();
    return res.json(allTransac);
  } catch (err: any) {
    return res.json(err.message);
  }
};

export const allMyUserTransaction = async (req: Request, res: Response) => {
  try {
    const bankersId = req.user.id;

    const transactions = await Transaction.getBankersUserTransaction(bankersId);

    return res.json({
      status: "success",
      msg: "all user transaction",
      transactions: transactions,
    });
  } catch (err: any) {
    return res.json(err.message);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const client = await Client.getAll();

    return res.json(client);
  } catch (err: any) {
    return res.json(err.message);
  }
};
