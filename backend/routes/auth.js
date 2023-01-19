import express from "express";
import Joi from "joi";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { MYSQL_CONFIG } from "../src/config.js";

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const router = express.Router();

router.post("/register", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: `Incorrect data` });
  }

  try {
    const hashedPassword = bcrypt.hashSync(userData.password);

    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [data] = await con.execute(
      `INSERT INTO users (email, password) VALUES (${mysql.escape(
        userData.email
      )}, '${hashedPassword}')`
    );

    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(MYSQL_CONFIG);
    console.log(err);
    return res.status(500).send({ err: "Unexpected error, try again" });
  }
});

router.post("/login", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: `Incorrect email or password` });
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [data] = await con.execute(
      `SELECT * FROM users WHERE email=${mysql.escape(userData.email)}`
    );

    if (data.length === 0) {
      return res.status(400).send({ err: `Incorecct email or password` });
    }

    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

    if (isAuthed) {
      return res.send("You are logged in");
    }

    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(MYSQL_CONFIG);
    console.log(err);
    return res.status(500).send({ err: "Unexpected error, try again" });
  }
});

export default router;
