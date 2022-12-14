import client from "../database";

export type order_details = {
  order_id: number;
  id_product_order: number;
  quantity_product_order: number;
};

export class order_detailsStore {
  async index(): Promise<order_details> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM order_details";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order_details. Error: ${err}`);
    }
  }

  async show(id: string): Promise<order_details> {
    try {
      const sql = "SELECT * FROM order_details WHERE order_id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order_details ${id}. Error: ${err}`);
    }
  }

  async create(od: order_details): Promise<order_details> {
    try {
      const sql =
        "INSERT INTO order_details (order_id, id_product_order,quantity_product_order ) VALUES($1, $2, $3) RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [
        od.order_id,
        od.id_product_order,
        od.quantity_product_order,
      ]);

      const details = result.rows[0];

      conn.release();
      return details;
    } catch (err) {
      throw new Error(
        `Could not add new order_details ${od.order_id}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<order_details|never> {
    try {
      const sql = "DELETE FROM order_details WHERE order_id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const details = result.rows[0];

      conn.release();

      return details;
    } catch (err) {
      throw new Error(`Could not delete order_details ${id}. Error: ${err}`);
    }
  }
}
