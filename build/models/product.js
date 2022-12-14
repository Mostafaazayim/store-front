"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async create(p) {
        const conne = await database_1.default.connect();
        const sql = "INSERT INTO product (id,product_name, price) VALUES($1, $2,$3) RETURNING *";
        const result = await conne.query(sql, [p.id, p.product_name, p.price]);
        const product = result.rows[0];
        conne.release();
        return product;
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM product";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get product. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM product WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM product WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.productStore = productStore;
