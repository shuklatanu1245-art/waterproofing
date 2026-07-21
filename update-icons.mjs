import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function run() {
  try {
    await sql`UPDATE services SET image_url = '/services/roof_icon.jpg' WHERE title ILIKE '%roof%'`;
    await sql`UPDATE services SET image_url = '/services/water_tank_icon.jpg' WHERE title ILIKE '%tank%'`;
    console.log('Updated');
  } catch(e) {
    console.error(e);
  }
}
run();
