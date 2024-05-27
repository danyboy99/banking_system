import { Request, Response } from "express";
import Client from "../services/client";
import Transaction from "../services/transaction";
import argon from "argon2";
import validateLoginInput from "../validate_input/loginInput";
import validateClientSignup from "../validate_input/clientSignup";
import validateCreateTransacInput from "../validate_input/createTransac";

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

    // validate req.body input
    const { error, isValid } = validateClientSignup(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

    const client = await Client.createClient(
      firstname,
      lastname,
      email,
      balance,
      card_number,
      account_manager,
      password
    );
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // validate req.body input
    const { error, isValid } = validateLoginInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

    const foundClient = await Client.findByEmail(email);

    if (!foundClient) {
      return res.json({
        status: "failed !!",
        msg: "no user with the inputed email",
      });
    }

    const verifyPassword = await argon.verify(foundClient.password, password);

    if (!verifyPassword) {
      return res.json({
        status: "failed !!",
        msg: "incorrect password !",
      });
    }

    return res.json({
      status: "success",
      msg: "login successfuly",
      token: Client.signToken(foundClient),
    });
  } catch (err: any) {
    return res.json(err.message);
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount } = req.body;

    // validate req.body input
    const { error, isValid } = validateCreateTransacInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

    const clientId = req.user.id;
    let useAmount = Number(amount);
    const currentClient = await Client.findOneById(clientId);
    console.log("user:", currentClient);
    if (!currentClient) {
      return res.json({
        status: "failed !!",
        msg: "client not found !!",
      });
    }

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

export const getAllUserTransaction = async (req: Request, res: Response) => {
  try {
    const clientId = req.user.id;
    console.log("user:", req.user.id);
    const currentClient = await Client.findOneById(clientId);
    if (!currentClient) {
      return res.json({
        status: "failed",
        msg: "client not found!!",
      });
    }

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

export const getAllTransac = async (req: Request, res: Response) => {
  try {
    const allTransac = await Transaction.getAllTransaction();
    return res.json(allTransac);
  } catch (err: any) {
    return res.json(err.message);
  }
};
