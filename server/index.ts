import express, { NextFunction, Request, Response } from "express";
import { databaseConnect } from "./config/databaseConnect";
import { ClientRoutes } from "./router/Client";
import { bankersRoutes } from "./router/banker";
import dotenv from "dotenv";
const app = express();
// set up database

dotenv.config();

databaseConnect
  .initialize()
  .then(() => {
    console.log(`connected to database successfuly!!`);
  })
  .catch((err) => {
    throw new Error(err.message);
  });

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
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

app.use("/api/client", ClientRoutes);
app.use("/api/banker", bankersRoutes);

const port = process.env.PORT;

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`app is runging on Port ${port}`);
});
