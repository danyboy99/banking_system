"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const banker_1 = require("../controller/banker");
const verifyToken_1 = require("../config/verifyToken");
const router = express_1.default.Router();
exports.bankersRoutes = router;
router.get("/", (req, res) => {
    return res.json("welcome to 99 banking system bankers index route");
});
router.post("/createbanker", verifyToken_1.signBankerToken, banker_1.createBankers);
router.get("/clienttransac", banker_1.getAllTransac);
router.get("/getmyusertransaction", banker_1.allMyUserTransaction);
router.post("/login", banker_1.login);
router.get("/getallbanker", banker_1.getAllBankers);
router.get("/getallclient", banker_1.getAllUser);
