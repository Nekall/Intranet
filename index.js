console.log("Hello, World!");
import express from "express";
import router from "./routes/index.js";
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express();
const __dirname = join(dirname(fileURLToPath(import.meta.url))) 

app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

// router
app.use("/", router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
