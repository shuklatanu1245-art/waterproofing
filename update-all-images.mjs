import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function run() {
  try {
    console.log("Updating services with new images...");
    
    // AI Generated Images
    await sql`UPDATE services SET image_url = '/services/worker_roof.jpg' WHERE id = 1`;
    await sql`UPDATE services SET image_url = '/services/worker_terrace.jpg' WHERE id = 2`;
    await sql`UPDATE services SET image_url = '/services/worker_bathroom.jpg' WHERE id = 3`;
    await sql`UPDATE services SET image_url = '/services/worker_basement.jpg' WHERE id = 4`;
    await sql`UPDATE services SET image_url = '/services/worker_balcony.jpg' WHERE id = 5`;
    await sql`UPDATE services SET image_url = '/services/worker_watertank.jpg' WHERE id = 6`;
    await sql`UPDATE services SET image_url = '/services/worker_exterior.jpg' WHERE id = 7`;
    
    // Unsplash High-Quality HD Images (since AI quota exhausted for the remaining 5)
    await sql`UPDATE services SET image_url = 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=600&auto=format&fit=crop' WHERE id = 8`; // Foundation
    // id = 9 is Crack Filling, already has Unsplash URL.
    await sql`UPDATE services SET image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop' WHERE id = 10`; // Chemical
    await sql`UPDATE services SET image_url = 'https://images.unsplash.com/photo-1518732810842-88b907db1387?q=80&w=600&auto=format&fit=crop' WHERE id = 11`; // Damp Proofing
    await sql`UPDATE services SET image_url = 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?q=80&w=600&auto=format&fit=crop' WHERE id = 12`; // Swimming Pool
    await sql`UPDATE services SET image_url = 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=600&auto=format&fit=crop' WHERE id = 13`; // Industrial
    
    console.log("Successfully updated all images!");
  } catch(e) {
    console.error(e);
  }
}
run();
