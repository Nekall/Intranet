import jwt from "jsonwebtoken";

// Models
import {Users} from "../models/users.model.js";

export const adminGuard = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Missing jwt token",
    });
  }
  try {
    const decodedToken = jwt.verify(
      authHeader.split(" ")[1],
      process.env.JWT_SECRET
    );

    if (!decodedToken.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this resource",
      });
    }

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }
  next();
};
