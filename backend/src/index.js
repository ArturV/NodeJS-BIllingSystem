import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import auth from "../routes/auth.js";
import { createNewGroup, getGroups } from "../routes/groups.js";
import { addUserToGroup, userGroups } from "../routes/accounts.js";
import { createNewBill, getBillbyId } from "../routes/bills.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth/", auth);

app.get("/groups", getGroups);
app.post("/groups", createNewGroup);
app.post("/accounts", addUserToGroup);
app.get("/accounts", userGroups);

app.get("/bills/:group_id", getBillbyId);
app.post("/bills", createNewBill);

app.get("/", (_, res) => {
  res.send({ msg: "Server running" });
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
