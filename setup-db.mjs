import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    console.log("Creating services table...");
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        icon VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log("Creating before_after_videos table...");
    await sql`
      CREATE TABLE IF NOT EXISTS before_after_videos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        before_video_url TEXT NOT NULL,
        after_video_url TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed services if the table is empty
    const { rowCount } = await sql`SELECT 1 FROM services LIMIT 1`;
    if (rowCount === 0) {
      console.log("Seeding initial services...");
      const initialServices = [
        { title: "Roof Waterproofing", icon: "Home", desc: "Complete protection for all types of roofs against water seepage.", order: 1 },
        { title: "Terrace Waterproofing", icon: "Grid", desc: "Durable terrace treatments to prevent leakage into lower floors.", order: 2 },
        { title: "Bathroom Waterproofing", icon: "Bath", desc: "Advanced solutions for bathrooms to stop tile and wall dampness.", order: 3 },
        { title: "Basement Waterproofing", icon: "Archive", desc: "Protect your basement from groundwater and humidity.", order: 4 },
        { title: "Balcony Waterproofing", icon: "LayoutGrid", desc: "Seamless coatings to keep your balconies leak-free.", order: 5 },
        { title: "Water Tank Waterproofing", icon: "Droplets", desc: "Safe and hygienic waterproofing for underground and overhead tanks.", order: 6 },
        { title: "Exterior Wall Waterproofing", icon: "Building", desc: "Prevent rain water from seeping through exterior walls.", order: 7 },
        { title: "Foundation Waterproofing", icon: "Hammer", desc: "Strengthen your building's base by preventing water ingress.", order: 8 },
        { title: "Crack Filling & Repair", icon: "ArrowUpRight", desc: "Professional sealing of cracks to prevent future water ingress.", order: 9 },
        { title: "Chemical Waterproofing", icon: "Beaker", desc: "Advanced liquid applied membranes for tough surfaces.", order: 10 },
        { title: "Damp Proofing", icon: "CloudRain", desc: "Treatments to block rising dampness from the ground.", order: 11 },
        { title: "Swimming Pool Waterproofing", icon: "Waves", desc: "Epoxy and cementitious coatings for pools and water bodies.", order: 12 },
        { title: "Industrial Waterproofing", icon: "Factory", desc: "Heavy-duty waterproofing for factories and warehouses.", order: 13 },
      ];

      for (const svc of initialServices) {
        await sql`
          INSERT INTO services (title, icon, description, display_order)
          VALUES (${svc.title}, ${svc.icon}, ${svc.desc}, ${svc.order})
        `;
      }
    }

    console.log("Database update complete!");
  } catch (err) {
    console.error("Database update failed:", err);
  }
}
main();
