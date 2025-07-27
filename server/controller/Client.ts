// Client controller - handles client-related HTTP requests
import { Request, Response } from "express";
import Client from "../services/client";
import Transaction from "../services/transaction";
import argon from "argon2";
import validateLoginInput from "../validate_input/loginInput";
import validateClientSignup from "../validate_input/clientSignup";
import validateCreateTransacInput from "../validate_input/createTransac";

// Create a new client account
export const createClient = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      email,
      balance,
      card_number,
      account_manager,
      password,
    } = req.body;

    // Validate request body input
    const { error, isValid } = validateClientSignup(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }

    // Create new client
    const client = await Client.createClient(
      firstname,
      lastname,
      email,
      balance,
      card_number,
      account_manager,
      password
    );

    // Generate JWT token
    const token = Client.signToken(client);
    return res.json({
      status: "success",
      msg: "client created successfuly !!",
      token: token,
    });
  } catch (err: any) {
    return res.json(err.message);
  }
};

// Client login authentication
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate request body input
    const { error, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }

    // Find client by email
    const foundClient = await Client.findByEmail(email);

    if (!foundClient) {
      return res.json({
        status: "failed !!",
        msg: "no user with the inputed email",
      });
    }

    // Verify password using argon2
    const verifyPassword = await argon.verify(foundClient.password, password);

    if (!verifyPassword) {
      return res.json({
        status: "failed !!",
        msg: "incorrect password !",
      });
    }

    // Return success with JWT token
    return res.json({
      status: "success",
      msg: "login successfuly",
      token: Client.signToken(foundClient),
    });
  } catch (err: any) {
    return res.json(err.message);
  }
};

// Create a new transaction for authenticated client
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount } = req.body;

    // Validate request body input
    const { error, isValid } = validateCreateTransacInput(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }

    // Get client ID from authenticated user
    const clientId = req.user.id;
    let useAmount = Number(amount);

    // Find current client
    const currentClient = await Client.findOneById(clientId);
    console.log("user:", currentClient);

    if (!currentClient) {
      return res.json({
        status: "failed !!",
        msg: "client not found !!",
      });
    }

    // Create the transaction
    const createdTransaction = await Transaction.createTransaction(
      currentClient,
      type,
      useAmount
    );

    return res.json({
      status: "success",
      msg: "transaction created successfuly!!",
      transactionDetails: createdTransaction,
    });
  } catch (err: any) {
    return res.json(err.message);
  }
};

// Get all transactions for authenticated client
export const getAllUserTransaction = async (req: Request, res: Response) => {
  try {
    const clientId = req.user.id;
    console.log("user:", req.user.id);

    // Verify client exists
    const currentClient = await Client.findOneById(clientId);
    if (!currentClient) {
      return res.json({
        status: "failed",
        msg: "client not found!!",
      });
    }

    // Get client's transactions
    const currentClientTransaction = await Transaction.getUserTransactions(
      clientId
    );
    console.log("user transac:", currentClientTransaction);

    return res.json({
      status: "success",
      msg: "transaction found successfuly!!",
      transactionDetails: currentClientTransaction,
    });
  } catch (err: any) {
    return res.json(err.message);
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
