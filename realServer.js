import app from "./middleware.js";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
