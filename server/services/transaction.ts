// Transaction service - business logic for transaction operations
import { Client } from "../entities/client";
import { Transaction } from "../entities/transactions";

// Create a new transaction and update client balance
const createTransaction = async (client: any, type: string, amount: number) => {
  try {
    // Create transaction record
    const newTransaction = Transaction.create({
      amount,
      type,
      client: client.id,
    });
    console.log("got here");
    console.log("got client:", client);

    // Update client balance based on transaction type
    if (type === "withdraw") {
      client.balance -= amount;
    }
    if (type === "deposit") {
      let currentAmount = Number(client.balance) + amount;
      client.balance = currentAmount;
    }

    // Save both client and transaction
    await client.save();
    await newTransaction.save();

    return newTransaction;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Get all transactions for a specific client
const getUserTransactions = async (client: any) => {
  try {
    const clientTransaction = await Transaction.findBy({ client: client });
    console.log("transac:", clientTransaction);
    return clientTransaction;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Get all transactions in the system
const getAllTransaction = () => {
  let allClient = Transaction.find();
  return allClient;
};

// Get transactions for clients managed by a specific banker
const getBankersUserTransaction = async (id: string) => {
  try {
    // Find client managed by this banker
    const client: any = await Client.findOneBy({ account_manager: id });

    // Get transactions for that client
    const transactions = await Transaction.findBy({ client: client.id });

    return transactions;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Export transaction service methods
const transactionService = {
  createTransaction,
  getUserTransactions,
  getAllTransaction,
  getBankersUserTransaction,
};

export default transactionService;
