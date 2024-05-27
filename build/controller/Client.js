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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransac = exports.getAllUserTransaction = exports.createTransaction = exports.login = exports.createClient = void 0;
const client_1 = __importDefault(require("../services/client"));
const transaction_1 = __importDefault(require("../services/transaction"));
const argon2_1 = __importDefault(require("argon2"));
const loginInput_1 = __importDefault(require("../validate_input/loginInput"));
const clientSignup_1 = __importDefault(require("../validate_input/clientSignup"));
const createTransac_1 = __importDefault(require("../validate_input/createTransac"));
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, balance, card_number, account_manager, password, } = req.body;
        // validate req.body input
        const { error, isValid } = (0, clientSignup_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const client = yield client_1.default.createClient(firstname, lastname, email, balance, card_number, account_manager, password);
        const token = client_1.default.signToken(client);
        return res.json({
            status: "success",
            msg: "client created successfuly !!",
            token: token,
        });
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.createClient = createClient;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // validate req.body input
        const { error, isValid } = (0, loginInput_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const foundClient = yield client_1.default.findByEmail(email);
        if (!foundClient) {
            return res.json({
                status: "failed !!",
                msg: "no user with the inputed email",
            });
        }
        const verifyPassword = yield argon2_1.default.verify(foundClient.password, password);
        if (!verifyPassword) {
            return res.json({
                status: "failed !!",
                msg: "incorrect password !",
            });
        }
        return res.json({
            status: "success",
            msg: "login successfuly",
            token: client_1.default.signToken(foundClient),
        });
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.login = login;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, amount } = req.body;
        // validate req.body input
        const { error, isValid } = (0, createTransac_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const clientId = req.user.id;
        let useAmount = Number(amount);
        const currentClient = yield client_1.default.findOneById(clientId);
        console.log("user:", currentClient);
        if (!currentClient) {
            return res.json({
                status: "failed !!",
                msg: "client not found !!",
            });
        }
        const createdTransaction = yield transaction_1.default.createTransaction(currentClient, type, useAmount);
        return res.json({
            status: "success",
            msg: "transaction created successfuly!!",
            transactionDetails: createdTransaction,
        });
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.createTransaction = createTransaction;
const getAllUserTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientId = req.user.id;
        console.log("user:", req.user.id);
        const currentClient = yield client_1.default.findOneById(clientId);
        if (!currentClient) {
            return res.json({
                status: "failed",
                msg: "client not found!!",
            });
        }
        const currentClientTransaction = yield transaction_1.default.getUserTransactions(clientId);
        console.log("user transac:", currentClientTransaction);
        return res.json({
            status: "success",
            msg: "transaction found successfuly!!",
            transactionDetails: currentClientTransaction,
        });
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.getAllUserTransaction = getAllUserTransaction;
const getAllTransac = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTransac = yield transaction_1.default.getAllTransaction();
        return res.json(allTransac);
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.getAllTransac = getAllTransac;
