import express, { Request, Response } from "express";
import { databaseConnect } from "./config/databaseConnect";
import { ClientRoutes } from "./router/Client";
import { bankersRoutes } from "./router/banker";
const app = express();
// set up database

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
  return res.json("working on it");
});

app.use("/api/client", ClientRoutes);
app.use("/api/banker", bankersRoutes);

const port = process.env.PORT || 7300;

app.listen(port, () => {
  console.log(`app is runging on Port ${port}`);
});
