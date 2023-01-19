import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import auth from "../routes/auth.js";
import { getGroups } from "../routes/groups.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth/", auth);

app.get("/groups", getGroups);

app.get("/", (_, res) => {
  res.send({ msg: "Server running" });
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
