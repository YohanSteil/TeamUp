import 'dotenv/config';
import pg from "pg";

const { Pool } = pg;

const client = new Pool();

// to test if the database is connected locally use =>
// client.on("connect", () => {
//   console.log("Connected to PostgreSQL database");
// });

// client.on("error", (err) => {
//   console.error("Error connecting to PostgreSQL database:", err);
// });
// client.connect();
export default client;
