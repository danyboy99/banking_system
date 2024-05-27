"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = __importDefault(require("./isEmpty"));
const validateCreateTransacInput = (data) => {
    let error = {};
    data.type = !(0, isEmpty_1.default)(data.type) ? data.type : "";
    data.amount = !(0, isEmpty_1.default)(data.amount) ? data.amount : "";
    if (validator_1.default.isEmpty(data.type)) {
        error.type = "type field is Required";
    }
    if (data.type !== "deposit" || data.type !== "withdraw") {
        error.type = "type must be deposit or withdraw";
    }
    if (!Number(data.amount)) {
        error.amount = "amount must be a number";
    }
    return {
        error,
        isValid: (0, isEmpty_1.default)(error),
    };
};
exports.default = validateCreateTransacInput;
