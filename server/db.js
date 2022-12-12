import * as pg from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});
const { Pool } = pg.default;

pg.default.types.setTypeParser(1082, (value) => value);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default class db {
  static async query(text, params) {
    return pool.query(text, params);
  }
}
