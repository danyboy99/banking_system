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
exports.getAllUser = exports.allMyUserTransaction = exports.getAllTransac = exports.getAllBankers = exports.login = exports.createBankers = void 0;
const banker_1 = __importDefault(require("../services/banker"));
const client_1 = __importDefault(require("../services/client"));
const transaction_1 = __importDefault(require("../services/transaction"));
const argon2_1 = __importDefault(require("argon2"));
const loginInput_1 = __importDefault(require("../validate_input/loginInput"));
const bankerSignup_1 = __importDefault(require("../validate_input/bankerSignup"));
const createBankers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, card_number, employees_number, password, } = req.body;
        // validate req.body input
        const { error, isValid } = (0, bankerSignup_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const banker = yield banker_1.default.createbanker(firstname, lastname, email, card_number, employees_number, password);
        const token = banker_1.default.signToken(banker);
        return res.json({
            status: "success",
            msg: "client created successfuly !!",
            token,
        });
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.createBankers = createBankers;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // validate req.body input
        const { error, isValid } = (0, loginInput_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const foundBanker = yield banker_1.default.findByEmail(email);
        if (!foundBanker) {
            return res.json({
                status: "failed",
                msg: "no registered banker with this email !!",
            });
        }
        const verifyPassword = yield argon2_1.default.verify(foundBanker.password, password);
        if (!verifyPassword) {
            return res.json({
                status: "failed",
                msg: "incorrect password",
            });
        }
        const token = banker_1.default.signToken(foundBanker);
        return res.json({
            status: "success",
            msg: "login successful",
            token,
        });
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.login = login;
const getAllBankers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankers = yield banker_1.default.getAll();
        return res.json(bankers);
    }
    catch (err) {
        return res.json(err);
    }
});
exports.getAllBankers = getAllBankers;
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
const allMyUserTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankersId = req.user.id;
        const transactions = yield transaction_1.default.getBankersUserTransaction(bankersId);
        return res.json({
            status: "success",
            msg: "all user transaction",
            transactions: transactions,
        });
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.allMyUserTransaction = allMyUserTransaction;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.default.getAll();
        return res.json(client);
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.getAllUser = getAllUser;
