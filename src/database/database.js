import { config } from "dotenv";
import pg from "pg";

class Database {
  #pool;

  constructor() {
    this.#configDatabase();
  }

  #configDatabase() {
    config();

    this.#pool = new pg.Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      max: 20,
    });
  }

  async executeQuery({ query, args }) {
    const client = await this.#pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(query, args);

      await client.query("COMMIT");

      client.release;

      return result.rows;
    } catch (error) {
      await client.query("ROLLBACK");

      client.release();

      throw error;
    }
  }
}

const database = new Database();

export default database;
