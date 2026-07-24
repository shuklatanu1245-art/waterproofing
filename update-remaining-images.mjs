import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function run() {
  try {
    console.log("Updating remaining services with new AI images...");
    
    await sql`UPDATE services SET image_url = '/services/worker_foundation.jpg' WHERE id = 8`;
    await sql`UPDATE services SET image_url = '/services/worker_crack_filling.jpg' WHERE id = 9`;
    await sql`UPDATE services SET image_url = '/services/worker_chemical.jpg' WHERE id = 10`;
    await sql`UPDATE services SET image_url = '/services/worker_damp_proofing.jpg' WHERE id = 11`;
    await sql`UPDATE services SET image_url = '/services/worker_swimming_pool.jpg' WHERE id = 12`;
    await sql`UPDATE services SET image_url = '/services/worker_industrial.jpg' WHERE id = 13`;
    
    console.log("Successfully updated all remaining images!");
  } catch(e) {
    console.error(e);
  }
}
run();
