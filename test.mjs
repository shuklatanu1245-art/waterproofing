import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';
dotenv.config();
async function main() {
  const { rows } = await sql`SELECT * FROM services`;
  console.log(rows.length, 'services found');
}
main();
