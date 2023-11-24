import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Models
import { Users } from "../models/users.model.js";

// Utils
import { loginValidators } from "../utils/validators.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = loginValidators({ email, password });

  if (!errors.noErrors) {
    delete errors.noErrors;
    return res.status(400).json({
      success: false,
      message: "Invalid email and/or password.",
      details: errors,
    });
  }

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
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
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "An error has occurred, please try again later."
    });
  }
};

export { login };
