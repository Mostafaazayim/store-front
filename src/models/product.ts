import client from "../database";

export type product = {
  id: number;
  product_name: string;
  price: number;
};

export class productStore {
  async create(p: product): Promise<product> {
    const conne = await client.connect();
    const sql =
      "INSERT INTO product (id,product_name, price) VALUES($1, $2,$3) RETURNING *";
    const result = await conne.query(sql, [p.id, p.product_name, p.price]);
    const product = result.rows[0];
    conne.release();
    return product;
  }

  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM product";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }

  async show(id: string): Promise<product> {
    try {
      const sql = "SELECT * FROM product WHERE id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  
  async delete(id: string): Promise<product> {
    try {
      const sql = "DELETE FROM product WHERE id=($1)";

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
