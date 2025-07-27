// Client service - business logic for client operations
import { Client } from "../entities/client";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/keys";

// Create a new client with hashed password
const createClient = async (
  first_name: string,
  last_name: string,
  email: string,
  balance: number,
  card_number: string,
  account_manager: string,
  password: string
) => {
  try {
    // Hash password before storing
    let hashPassword = await argon.hash(password);

    // Create client entity
    const client = Client.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      card_number: card_number,
      balance: balance,
      account_manager: account_manager,
      password: hashPassword,
    });

    await client.save();
    return client;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Get all clients
const getAll = () => {
  let allClient = Client.find();
  return allClient;
};

// Find client by ID
const findOneById = async (id: any) => {
  try {
    const currentClient = await Client.findOneBy({ id: id });
    return currentClient;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Find client by email address
const findByEmail = async (email: string) => {
  try {
    const currentClient = await Client.findOneBy({ email: email });
    return currentClient;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Generate JWT token for client authentication
const signToken = (user: any) => {
  const payload = {
    user: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // 2 hours expiry
  };
  return jwt.sign(payload, jwt_secret);
};

// Export client service methods
const clientService = {
  createClient,
  getAll,
  findOneById,
  findByEmail,
  signToken,
};

export default clientService;
