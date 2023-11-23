import bcrypt from "bcrypt";
import { Users } from "../models/users.model.js";
import dotenv from "dotenv";
dotenv.config();
const { SALT_ROUNDS } = process.env;

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
        message: "All users found.",
        data: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "An error has occurred, users cannot be found.",
        details: error.message,
      });
    });
};

const update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  let user = await Users.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "This user's profile was not found.",
    });
  }

  if (data.password) {
    const password = await bcrypt.hash(data.password, parseInt(SALT_ROUNDS));
    data.password = password;
  }

  try {
    await Users.updateOne(
      { _id: id },
      { $set: data },
      {
        new: true,
      }
    );

    user = await Users.findById(id);
    return res.json({
      success: true,
      message: `${user.firstname} ${user.lastname}'s profile has been updated.`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error has occurred, this profile cannot be updated.",
      details: error.message,
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  const user = await Users.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "This user's profile was not found.",
    });
  }

  try {
    await Users.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: `${user.firstname} ${user.lastname}'s profile has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error has occurred, this profile cannot be deleted.",
      details: error.message,
    });
  }
};

export { allUsers, update, remove };
