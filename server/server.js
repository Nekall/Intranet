import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import cors from "cors";

// Var env
import dotenv from "dotenv";
dotenv.config();
const { APP_HOSTNAME, APP_PORT, DB_HOST, SEEDING_MODE, NODE_ENV } = process.env;

// Routers
import UsersRouter from "./routes/users.router.js";
import authRouter from "./routes/auth.router.js";

// Seed
import { seed } from "./seed.js";

const app = express();
export const __dirname = join(dirname(fileURLToPath(import.meta.url)));

app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Router
app.get("/", (_, res) => {
  res.json({
    message: "Welcome in Intranet API",
  });
});
app.use("/users", UsersRouter);
app.use("/", authRouter);

try {
  await mongoose.connect(DB_HOST);
  if (JSON.parse(SEEDING_MODE)) {
    seed();
  } else {
    console.log("📡 Connected to mongoDB");
    app.listen(APP_PORT, () => {
      if (APP_HOSTNAME.includes("localhost")) {
        console.log(
          `🔌 App listening at http://${APP_HOSTNAME}:${APP_PORT} | Mode: ${NODE_ENV}`
        );
      } else {
        console.log(`🔌 App listening at ${APP_HOSTNAME} | Mode: ${NODE_ENV}`);
      }
    });
  }
} catch (err) {
  console.log("❌ Connection error");
  console.log(err);
}
