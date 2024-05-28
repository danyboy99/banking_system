"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseConnect_1 = require("./config/databaseConnect");
const Client_1 = require("./router/Client");
const banker_1 = require("./router/banker");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
// set up database
dotenv_1.default.config();
databaseConnect_1.databaseConnect
    .initialize()
    .then(() => {
    console.log(`connected to database successfuly!!`);
})
    .catch((err) => {
    throw new Error(err.message);
});
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.json({
        msg: "welcome to danyboy99 banking-system-api ",
        routes: {
            client_signup: "/api/client/createclient",
            client_login: "/api/client/login",
            client_create_transaction_privateroute: "/api/client/createTransaction",
            client_check_transaction_privateroute: "/api/client/getalltransac",
        },
    });
});
app.use("/api/client", Client_1.ClientRoutes);
app.use("/api/banker", banker_1.bankersRoutes);
const port = process.env.PORT;
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`app is runging on Port ${port}`);
});
