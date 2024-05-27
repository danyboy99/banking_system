"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../entities/client");
const transactions_1 = require("../entities/transactions");
const createTransaction = (client, type, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTransaction = transactions_1.Transaction.create({
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
        yield client.save();
        yield newTransaction.save();
        return newTransaction;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getUserTransactions = (client) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientTransaction = yield transactions_1.Transaction.findBy({ client: client });
        console.log("transac:", clientTransaction);
        return clientTransaction;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getAllTransaction = () => {
    let allClient = transactions_1.Transaction.find();
    return allClient;
};
const getBankersUserTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.Client.findOneBy({ account_manager: id });
        const transactions = yield transactions_1.Transaction.findBy({ client: client.id });
        return transactions;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const transactionService = {
    createTransaction,
    getUserTransactions,
    getAllTransaction,
    getBankersUserTransaction,
};
exports.default = transactionService;
