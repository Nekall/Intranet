import jwt from "jsonwebtoken";

export const authGuard = async (req, res, next) => {
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

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }
  next();
};
