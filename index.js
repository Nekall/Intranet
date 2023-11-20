import express from "express";
import router from "./routes/index.js";
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const {
    APP_HOSTNAME,
    APP_PORT,
    DB_HOST,
  } = process.env;

const app = express();
const __dirname = join(dirname(fileURLToPath(import.meta.url))) 

app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

// router
app.use("/", router);


try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
      console.log("📡 Connected to mongoDB");
      app.listen(APP_PORT, () => {
        if (APP_HOSTNAME.includes("localhost")) {
          console.log(`🔌 App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
        } else {
          console.log(`🔌 App listening at ${APP_HOSTNAME}`);
        }
      });
  } catch (err) {
    console.log("❌ Connection error");
    console.log(err);
  }