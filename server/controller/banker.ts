// Banker controller - handles banker-related HTTP requests
import { Request, Response } from "express";
import Banker from "../services/banker";
import Client from "../services/client";
import Transaction from "../services/transaction";
import argon from "argon2";
import validateLoginInput from "../validate_input/loginInput";
import validateBankerSignup from "../validate_input/bankerSignup";

// Create a new banker account
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

    // Validate request body input
    const { error, isValid } = validateBankerSignup(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }

    // Create new banker
    const banker = await Banker.createbanker(
      firstname,
      lastname,
      email,
      card_number,
      employees_number,
      password
    );

    // Generate JWT token
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

// Banker login authentication
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate request body input
    const { error, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }

    // Find banker by email
    const foundBanker = await Banker.findByEmail(email);
    if (!foundBanker) {
      return res.json({
        status: "failed",
        msg: "no registered banker with this email !!",
      });
    }

    // Verify password using argon2
    const verifyPassword = await argon.verify(foundBanker.password, password);
    if (!verifyPassword) {
      return res.json({
        status: "failed",
        msg: "incorrect password",
      });
    }

    // Generate JWT token
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

// Get all bankers (admin function)
export const getAllBankers = async (req: Request, res: Response) => {
  try {
    const bankers = await Banker.getAll();
    return res.json(bankers);
  } catch (err: any) {
    return res.json(err);
  }
};

// Get all transactions (admin function)
export const getAllTransac = async (req: Request, res: Response) => {
  try {
    const allTransac = await Transaction.getAllTransaction();
    return res.json(allTransac);
  } catch (err: any) {
    return res.json(err.message);
  }
};

// Get all transactions for banker's managed clients
export const allMyUserTransaction = async (req: Request, res: Response) => {
  try {
    const bankersId = req.user.id;

    // Get transactions for clients managed by this banker
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

// Get all clients (admin function)
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const client = await Client.getAll();
    return res.json(client);
  } catch (err: any) {
    return res.json(err.message);
  }
};
