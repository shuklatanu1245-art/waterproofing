import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function run() {
  try {
    const { rows } = await sql`SELECT id, title, image_url FROM services`;
    console.log(rows);
  } catch(e) {
    console.error(e);
  }
}
run();
