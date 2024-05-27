"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = __importDefault(require("./isEmpty"));
const validateClientSignup = (data) => {
    let error = {};
    data.email = !(0, isEmpty_1.default)(data.email) ? data.email : "";
    data.password = !(0, isEmpty_1.default)(data.password) ? data.password : "";
    data.firstname = !(0, isEmpty_1.default)(data.firstname) ? data.firstname : "";
    data.lastname = !(0, isEmpty_1.default)(data.lastname) ? data.lastname : "";
    data.balance = !(0, isEmpty_1.default)(data.balance) ? data.balance : "";
    data.account_manager = !(0, isEmpty_1.default)(data.account_manager)
        ? data.account_manager
        : "";
    data.card_number = !(0, isEmpty_1.default)(data.card_number) ? data.card_number : "";
    if (validator_1.default.isEmpty(data.email)) {
        error.email = "email field is Required";
    }
    if (!validator_1.default.isEmail(data.email)) {
        error.email = "Email is invalid.";
    }
    if (validator_1.default.isEmpty(data.password)) {
        error.password = "password field is Required";
    }
    if (validator_1.default.isEmpty(data.firstname)) {
        error.firstname = "firstname field is Required";
    }
    if (validator_1.default.isEmpty(data.lastname)) {
        error.lastname = "lastname field is Required";
    }
    if (!Number(data.balance)) {
        error.balance = "balance must be a number";
    }
    if (validator_1.default.isEmpty(data.account_manager)) {
        error.account_manager = "account-manager field is Required";
    }
    if (validator_1.default.isEmpty(data.card_number)) {
        error.card_number = "card_number field is Required";
    }
    return {
        error,
        isValid: (0, isEmpty_1.default)(error),
    };
};
exports.default = validateClientSignup;
