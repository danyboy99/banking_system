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
const banker_1 = require("../entities/banker");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
const createbanker = (first_name, last_name, email, card_number, employees_number, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashPassword = yield argon2_1.default.hash(password);
        console.log("got here");
        const banker = banker_1.Banker.create({
            first_name,
            last_name,
            email,
            card_number,
            employees_number,
            password: hashPassword,
        });
        console.log("got here:", banker);
        yield banker.save();
        return banker;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getAll = () => {
    let allbanker = banker_1.Banker.find();
    return allbanker;
};
const signToken = (user) => {
    const payload = {
        user: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
    };
    return jsonwebtoken_1.default.sign(payload, keys_1.jwt_secret);
};
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentBanker = yield banker_1.Banker.findOneBy({ email: email });
        return currentBanker;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const findOneById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentBanker = yield banker_1.Banker.findOneBy({ id: id });
        return currentBanker;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const bankerService = {
    createbanker,
    getAll,
    signToken,
    findByEmail,
    findOneById,
};
exports.default = bankerService;
