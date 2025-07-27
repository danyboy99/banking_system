// Main server entry point for the banking system
import express, { NextFunction, Request, Response } from "express";
import { databaseConnect } from "./config/databaseConnect";
import { ClientRoutes } from "./router/Client";
import { bankersRoutes } from "./router/banker";
import dotenv from "dotenv";

// Create Express application
const app = express();

// Load environment variables
dotenv.config();

// Initialize database connection
databaseConnect
  .initialize()
  .then(() => {
    console.log(`connected to database successfuly!!`);
  })
  .catch((err) => {
    throw new Error(err.message);
  });

// Middleware to parse JSON requests
app.use(express.json());

// Root endpoint with API documentation
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

// Route handlers
app.use("/api/client", ClientRoutes);
app.use("/api/banker", bankersRoutes);

// Server port configuration
const port = process.env.PORT || 7300;

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`app is runging on Port ${port}`);
});
