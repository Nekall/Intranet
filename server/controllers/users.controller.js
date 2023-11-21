import bcrypt from "bcrypt";
import { Users } from "../models/users.model.js";
import dotenv from "dotenv";
dotenv.config();
const { SALT_ROUNDS, APP_HOSTNAME } = process.env;
import { signUpValidators, loginValidators } from "../utils/validators.js";

const allUsers = (req, res) => {
  // with and without filter
  res.json({
    message: "Users",
  });
};

const update = async (req, res) => {
  // owner || admin
  res.json({
    message: "Update user",
  });
};

const remove = async (req, res) => {
  // admin
  res.json({
    message: "Remove user",
  });
};

export { allUsers, update, remove };
