import express from "express";
const authRouter = express.Router();
import { login } from "../controllers/auth.controller.js";

authRouter.post("/login", login);

export default authRouter;
