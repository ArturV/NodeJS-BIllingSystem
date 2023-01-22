import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { MYSQL_CONFIG, jwtSecret } from "../src/config.js";

export const addUserToGroup = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const group_id = +req.body?.id?.trim();

  let payload = null;

  if (!accessToken) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(accessToken, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  if (!group_id || group_id < 0) {
    return res
      .status(402)
      .send({ error: "Please input correct group id!" })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [isUserInGroup] = await con.execute(
      `SELECT group_id , user_id 
    FROM accounts 
    WHERE user_id= ${payload.id} AND group_id=${group_id} ;`
    );

    await con.end();

    if (Array.isArray(isUserInGroup) && isUserInGroup.length === 0) {
      try {
        const con = await mysql.createConnection(MYSQL_CONFIG);
        const [result] = await con.execute(
          `INSERT INTO accounts (group_id, user_id) VALUES ('${group_id}','${payload.id}')`
        );

        await con.end();

        return res.status(200).send(result).end();
      } catch (error) {
        res.res.status(500).send(error).end();
      }
    } else {
      return res
        .status(400)
        .send({ error: "Error! This user already exists in this group" })
        .end();
    }
  } catch (error) {
    res.status(500).send(error).end();

    return console.error(error);
  }
};

export const userGroups = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  let payload = null;

  if (!accessToken) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(accessToken, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }

    return res.status(400).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const query = `SELECT accounts.group_id, groupps.name FROM accounts INNER JOIN users ON users.id = accounts.user_id JOIN groupps ON groupps.id = accounts.group_id`;

    const [result] = await con.execute(query);

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};
