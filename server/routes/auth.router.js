import express from "express";
const authRouter = express.Router();
import { login } from "../controllers/auth.controller.js";

authRouter.get("/login", login);

export default authRouter;
