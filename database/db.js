import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
