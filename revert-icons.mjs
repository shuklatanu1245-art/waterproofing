import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function run() {
  try {
    // Revert all accidentally updated services back to their original state (which was NULL, meaning they use Lucide Icons)
    await sql`UPDATE services SET image_url = NULL WHERE id NOT IN (1, 6, 9)`;
    console.log('Reverted image_url to NULL for accidentally updated services');
    
    // Ensure Roof and Water Tank have the specific icons
    await sql`UPDATE services SET image_url = '/services/roof_icon.jpg' WHERE id = 1`;
    await sql`UPDATE services SET image_url = '/services/water_tank_icon.jpg' WHERE id = 6`;
    console.log('Ensured specific icons for Roof and Water Tank');
    
  } catch(e) {
    console.error(e);
  }
}
run();
