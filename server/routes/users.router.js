import express from "express";
const usersRouter = express.Router();

// Controllers
import { allUsers, update, remove } from "../controllers/users.controller.js";

// Middlewares
import { authGuard } from "../middlewares/auth.guard.js";
import { adminGuard } from "../middlewares/admin.guard.js";

usersRouter.get("/", authGuard, allUsers);
usersRouter.put("/:id", authGuard, update);
usersRouter.delete("/:id", adminGuard, remove);

export default usersRouter;
