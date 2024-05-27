"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnect = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const client_1 = require("../entities/client");
const banker_1 = require("../entities/banker");
const transactions_1 = require("../entities/transactions");
exports.databaseConnect = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5500,
    username: "postgres",
    password: "omotehinse",
    database: "banking-system-main-api",
    entities: [client_1.Client, banker_1.Banker, transactions_1.Transaction],
    synchronize: true,
});
