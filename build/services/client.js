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
const client_1 = require("../entities/client");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
const createClient = (first_name, last_name, email, balance, card_number, account_manager, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashPassword = yield argon2_1.default.hash(password);
        const client = client_1.Client.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            card_number: card_number,
            balance: balance,
            account_manager: account_manager,
            password: hashPassword,
        });
        yield client.save();
        return client;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getAll = () => {
    let allClient = client_1.Client.find();
    return allClient;
};
const findOneById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentClient = yield client_1.Client.findOneBy({ id: id });
        return currentClient;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentClient = yield client_1.Client.findOneBy({ email: email });
        return currentClient;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const signToken = (user) => {
    const payload = {
        user: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
    };
    return jsonwebtoken_1.default.sign(payload, keys_1.jwt_secret);
};
const clientService = {
    createClient,
    getAll,
    findOneById,
    findByEmail,
    signToken,
};
exports.default = clientService;
