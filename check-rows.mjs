import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function run() {
  try {
    const { rows: steps } = await sql`SELECT * FROM process_steps`;
    console.log('Steps:', steps.length);
    const { rows: services } = await sql`SELECT * FROM services`;
    console.log('Services:', services.length);
  } catch(e) {
    console.error(e);
  }
}
run();
