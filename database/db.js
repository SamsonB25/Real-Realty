import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

export const db = new Pool({
  // format: postgres://user:password@host:port/database
  connectionString: process.env.DATABASE_URL,
  // database: "real_realty",
  // user: "samson",
  // password: "samson",
  // host: "127.0.0.1",
});
