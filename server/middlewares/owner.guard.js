import jwt from "jsonwebtoken";

export const ownerGuard = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const id = req.params.id;

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

    if(decodedToken.isAdmin){
      return next()
    }

    if (decodedToken.id !== id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this resource",
      });
    }

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
      details: error.message,
    });
  }
  next();
};
