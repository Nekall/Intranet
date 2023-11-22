import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Users } from "../models/users.model.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing email and/or password",
    });
  }

  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Incorrect email or password",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message: "Incorrect email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    process.env.JWT_SECRET
  );

  return res.json({
    success: true,
    token,
  })
};

export { login };
