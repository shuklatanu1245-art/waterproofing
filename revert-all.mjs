import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function run() {
  try {
    await sql`UPDATE services SET image_url = NULL WHERE id IN (1, 6)`;
    console.log('Reverted to SVG icons');
  } catch(e) {
    console.error(e);
  }
}
run();
