import express from "express";
const authRouter = express.Router();
import { login, logout } from "../controllers/auth.controller.js";

authRouter.get("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
