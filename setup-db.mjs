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

    console.log("Creating testimonials table...");
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log("Creating gallery_photos table...");
    await sql`
      CREATE TABLE IF NOT EXISTS gallery_photos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        image_url TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
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
    const { rowCount: testCount } = await sql`SELECT 1 FROM testimonials LIMIT 1`;
    if (testCount === 0) {
      console.log("Seeding initial testimonials...");
      const initialTestimonials = [
        { name: "Rajesh Kumar", role: "Homeowner", text: "We had severe leakage in our terrace for years. AquaProtect fixed it completely within 3 days. It's been raining heavily and there is zero dampness. Highly recommended!" },
        { name: "Anita Sharma", role: "Apartment Secretary", text: "Very professional team. They inspected our entire building and provided a very cost-effective waterproofing solution for the exterior walls. The quality of work is excellent." },
        { name: "Vikram Singh", role: "Business Owner", text: "I hired them for basement waterproofing of my warehouse. They used high-grade chemicals and the problem is permanently solved. Great service and timely execution." }
      ];
      for (const t of initialTestimonials) {
        await sql`INSERT INTO testimonials (name, role, text) VALUES (${t.name}, ${t.role}, ${t.text})`;
      }
    }

    const { rowCount: photoCount } = await sql`SELECT 1 FROM gallery_photos LIMIT 1`;
    if (photoCount === 0) {
      console.log("Seeding initial gallery photos...");
      const initialPhotos = [
        { title: "Project 1", url: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", order: 1 },
        { title: "Project 2", url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop", order: 2 },
        { title: "Project 3", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop", order: 3 },
        { title: "Project 4", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop", order: 4 },
        { title: "Project 5", url: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?q=80&w=800&auto=format&fit=crop", order: 5 },
        { title: "Project 6", url: "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=800&auto=format&fit=crop", order: 6 },
      ];
      for (const p of initialPhotos) {
        await sql`INSERT INTO gallery_photos (title, image_url, display_order) VALUES (${p.title}, ${p.url}, ${p.order})`;
      }
    }

    console.log("Database update complete!");
  } catch (err) {
    console.error("Database update failed:", err);
  }
}
main();
