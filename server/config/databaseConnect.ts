import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "../entities/client";
import { Banker } from "../entities/banker";
import { Transaction } from "../entities/transactions";

export const databaseConnect = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5500,
  username: "postgres",
  password: "omotehinse",
  database: "banking-system-main-api",
  entities: [Client, Banker, Transaction],
  synchronize: true,
});
