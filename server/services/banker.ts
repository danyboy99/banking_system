import { Banker } from "../entities/banker";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/keys";

const createbanker = async (
  first_name: string,
  last_name: string,
  email: string,
  card_number: string,
  employees_number: string,
  password: string
) => {
  try {
    let hashPassword = await argon.hash(password);
    console.log("got here");
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

const getAll = () => {
  let allbanker = Banker.find();
  return allbanker;
};
const signToken = (user: any) => {
  const payload = {
    user: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
  };
  return jwt.sign(payload, jwt_secret);
};
const findByEmail = async (email: string) => {
  try {
    const currentBanker = await Banker.findOneBy({ email: email });
    return currentBanker;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
const findOneById = async (id: string) => {
  try {
    const currentBanker = await Banker.findOneBy({ id: id });
    return currentBanker;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
const bankerService = {
  createbanker,
  getAll,
  signToken,
  findByEmail,
  findOneById,
};

export default bankerService;
