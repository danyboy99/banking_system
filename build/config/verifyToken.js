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
exports.signBankerToken = exports.signClientToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("./keys");
const client_1 = __importDefault(require("../services/client"));
const banker_1 = __importDefault(require("../services/banker"));
const signClientToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const decoded = jsonwebtoken_1.default.verify(authorization, keys_1.jwt_secret);
        const foundId = decoded.user;
        const currentClient = yield client_1.default.findOneById(foundId);
        if (!currentClient) {
            return res.json({
                status: "failed!",
                msg: "user not authorized!!",
            });
        }
        req.user = currentClient;
        return next();
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.signClientToken = signClientToken;
const signBankerToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const decoded = jsonwebtoken_1.default.verify(authorization, keys_1.jwt_secret);
        if (!decoded) {
            return res.json({
                status: "failed!",
                msg: "user not authorized or you entered an expired token try generating a new one",
            });
        }
        const foundId = decoded.user;
        const currentBanker = yield banker_1.default.findOneById(foundId);
        if (!currentBanker) {
            return res.json({
                status: "failed!",
                msg: "user not authorized!!",
            });
        }
        req.user = currentBanker;
        return next();
    }
    catch (err) {
        return res.json(err.message);
    }
});
exports.signBankerToken = signBankerToken;
