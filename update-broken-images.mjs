import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function run() {
  try {
    console.log("Updating Foundation and Damp Proofing images...");
    
    await sql`UPDATE services SET image_url = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop' WHERE id = 8`; // Foundation
    await sql`UPDATE services SET image_url = 'https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=600&auto=format&fit=crop' WHERE id = 11`; // Damp Proofing
    
    console.log("Successfully updated the broken images!");
  } catch(e) {
    console.error(e);
  }
}
run();
