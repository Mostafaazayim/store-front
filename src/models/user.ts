import bcrypt from "bcrypt";
import client from "../database.js";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = process.env.salt_rounds as string;
const pepper = process.env.bcrypt_password;

export type user = {
  id?: number;
  username: string;
  password_digest: string;
};

export class userStore {
  async show(id: string): Promise<user> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find users ${id}. Error: ${err}`);
    }
  }
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async create(u: user): Promise<user> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (username,password_digest ) VALUES($1, $2) RETURNING *";

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [u.username, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }
  async authenticate(username: string, password: string): Promise<user | null> {
    const conn = await client.connect();
    const sql = "SELECT password_digest FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);
    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
  async delete(id: string): Promise<user> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete users ${id}. Error: ${err}`);
    }
  }
}
