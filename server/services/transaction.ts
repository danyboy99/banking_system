import { Client } from "../entities/client";
import { Transaction } from "../entities/transactions";

const createTransaction = async (client: any, type: string, amount: number) => {
  try {
    const newTransaction = Transaction.create({
      amount,
      type,
      client: client.id,
    });
    console.log("got here");
    console.log("got client:", client);

    if (type === "withdraw") {
      client.balance -= amount;
    }
    if (type === "deposit") {
      let currentAmount = Number(client.balance) + amount;
      client.balance = currentAmount;
    }

    await client.save();
    await newTransaction.save();

    return newTransaction;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getUserTransactions = async (client: any) => {
  try {
    const clientTransaction = await Transaction.findBy({ client: client });
    console.log("transac:", clientTransaction);
    return clientTransaction;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getAllTransaction = () => {
  let allClient = Transaction.find();
  return allClient;
};

const getBankersUserTransaction = async (id: string) => {
  try {
    const client: any = await Client.findOneBy({ account_manager: id });

    const transactions = await Transaction.findBy({ client: client.id });

    return transactions;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const transactionService = {
  createTransaction,
  getUserTransactions,
  getAllTransaction,
  getBankersUserTransaction,
};

export default transactionService;
