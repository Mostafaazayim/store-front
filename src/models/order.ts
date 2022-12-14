import client from "../database";

export type orders = {
  id: number;
  user_id: number|string;
  status_order: string;
};

export class orderStore {
  async index(): Promise<orders[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<orders> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find orders ${id}. Error: ${err}`);
    }
  }

  async create(o: orders): Promise<orders> {
    try {
      const sql =
        "INSERT INTO orders (id, user_id,status_order ) VALUES($1, $2, $3) RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [o.id, o.user_id, o.status_order]);

      const order = result.rows[0] ;

      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new orders ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<orders> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
