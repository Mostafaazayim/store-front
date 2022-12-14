"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_js_1 = __importDefault(require("../database.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = process.env.salt_rounds;
const pepper = process.env.bcrypt_password;
class userStore {
    async show(id) {
        try {
            const sql = "SELECT * FROM users WHERE id=($1)";
            const conn = await database_js_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find users ${id}. Error: ${err}`);
        }
    }
    async index() {
        try {
            const conn = await database_js_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_js_1.default.connect();
            const sql = "INSERT INTO users (username,password_digest ) VALUES($1, $2) RETURNING *";
            const hash = bcrypt_1.default.hashSync(u.password_digest + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.username, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`unable create user (${u.username}): ${err}`);
        }
    }
    async authenticate(username, password) {
        const conn = await database_js_1.default.connect();
        const sql = "SELECT password_digest FROM users WHERE username=($1)";
        const result = await conn.query(sql, [username]);
        console.log(password + pepper);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM users WHERE id=($1)";
            const conn = await database_js_1.default.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete users ${id}. Error: ${err}`);
        }
    }
}
exports.userStore = userStore;
