import { Client } from "../entities/client";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/keys";
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
    let hashPassword = await argon.hash(password);
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

const getAll = () => {
  let allClient = Client.find();
  return allClient;
};

const findOneById = async (id: any) => {
  try {
    const currentClient = await Client.findOneBy({ id: id });
    return currentClient;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
const findByEmail = async (email: string) => {
  try {
    const currentClient = await Client.findOneBy({ email: email });
    return currentClient;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const signToken = (user: any) => {
  const payload = {
    user: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
  };
  return jwt.sign(payload, jwt_secret);
};
const clientService = {
  createClient,
  getAll,
  findOneById,
  findByEmail,
  signToken,
};

export default clientService;
