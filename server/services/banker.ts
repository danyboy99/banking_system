// Banker service - business logic for banker operations
import { Banker } from "../entities/banker";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/keys";

// Create a new banker with hashed password
const createbanker = async (
  first_name: string,
  last_name: string,
  email: string,
  card_number: string,
  employees_number: string,
  password: string
) => {
  try {
    // Hash password before storing
    let hashPassword = await argon.hash(password);
    console.log("got here");

    // Create banker entity
    const banker = Banker.create({
      first_name,
      last_name,
      email,
      card_number,
      employees_number,
      password: hashPassword,
    });

    console.log("got here:", banker);
    await banker.save();
    return banker;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Get all bankers
const getAll = () => {
  let allbanker = Banker.find();
  return allbanker;
};

// Generate JWT token for banker authentication
const signToken = (user: any) => {
  const payload = {
    user: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // 2 hours expiry
  };
  return jwt.sign(payload, jwt_secret);
};

// Find banker by email address
const findByEmail = async (email: string) => {
  try {
    const currentBanker = await Banker.findOneBy({ email: email });
    return currentBanker;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Find banker by ID
const findOneById = async (id: string) => {
  try {
    const currentBanker = await Banker.findOneBy({ id: id });
    return currentBanker;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Export banker service methods
const bankerService = {
  createbanker,
  getAll,
  signToken,
  findByEmail,
  findOneById,
};

export default bankerService;
