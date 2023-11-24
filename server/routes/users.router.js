import express from "express";
const usersRouter = express.Router();

// Controllers
import {
  findOneUser,
  allUsers,
  update,
  remove,
} from "../controllers/users.controller.js";

// Middlewares
import { authGuard } from "../middlewares/auth.guard.js";
import { adminGuard } from "../middlewares/admin.guard.js";
import { ownerGuard } from "../middlewares/owner.guard.js";

usersRouter.get("/", authGuard, allUsers);
usersRouter.get("/:id", ownerGuard, findOneUser);
usersRouter.put("/:id", ownerGuard, update);
usersRouter.delete("/:id", adminGuard, remove);

export default usersRouter;
