import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "12345678",
  host: "localhost",
  port: 5432,
  database: "shopdb",
});

export default pool;
