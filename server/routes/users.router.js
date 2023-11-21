import express from "express";
const UsersRouter = express.Router();
import { allUsers } from "../controllers/users.controller.js";

UsersRouter.get("/", allUsers);

export default UsersRouter;
