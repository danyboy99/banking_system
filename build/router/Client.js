"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../controller/Client");
const verifyToken_1 = require("../config/verifyToken");
const router = express_1.default.Router();
exports.ClientRoutes = router;
router.get("/", (req, res) => {
    return res.json("welcome to 99 banking system client index route");
});
router.post("/createclient", Client_1.createClient);
router.post("/login", Client_1.login);
router.post("/createtransaction/", verifyToken_1.signClientToken, Client_1.createTransaction);
router.get("/getalltransac", verifyToken_1.signClientToken, Client_1.getAllUserTransaction);
