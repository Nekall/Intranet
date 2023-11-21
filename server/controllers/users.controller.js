import bcrypt from "bcrypt";
import { Users } from "../models/users.model.js";
import dotenv from "dotenv";
dotenv.config();
const { SALT_ROUNDS, APP_HOSTNAME } = process.env;
import { signUpValidators, loginValidators } from "../utils/validators.js";

const allUsers = (req, res) => {
  // exemple: http://localhost:4242/users?category=Mark&city=Toul
  const params = req.query;
  const filter = {};
  if (params.name) {
    filter.$or = [
      { firstname: { $regex: params.name, $options: "i" } },
      { lastname: { $regex: params.name, $options: "i" } },
    ];
  }
  if (params.city) {
    filter.city = { $regex: params.city, $options: "i" };
  }
  if (params.category) {
    filter.category = { $regex: params.category, $options: "i" };
  }

  Users.find(filter)
    .then((users) => {
      res.json({
        success: true,
        data: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
};

const update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const user = await Users.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (data.password) {
    const password = await bcrypt.hash(data.password, parseInt(SALT_ROUNDS));
    data.password = password;
  }

  const updatedUser = await Users.update({ _id: id }, { $set: data })
    .then((user) => {
      res.json({
        success: true,
        data: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
};

const remove = async (_, res) => {
  const id = req.params.id;
  const user = await Users.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  Users.remove({ _id: id })
    .then((user) => {
      res.json({
        success: true,
        data: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
};

export { allUsers, update, remove };
