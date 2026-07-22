import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function main() {
  try {
    console.log("Creating projects table...");
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        service VARCHAR(255) NOT NULL,
        completion_date VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        video_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Check if table is empty
    const { rowCount } = await sql`SELECT 1 FROM projects LIMIT 1`;
    if (rowCount === 0) {
      console.log("Seeding initial projects...");
      const allProjects = [
        {
          name: "ABC Apartment Complex",
          location: "Downtown City",
          service: "Terrace Waterproofing",
          date: "March 2023",
          category: "Residential",
          image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
        },
        {
          name: "XYZ International School",
          location: "North West Region",
          service: "Roof Waterproofing",
          date: "June 2023",
          category: "Commercial",
          image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000&auto=format&fit=crop",
        },
        {
          name: "Green Residency",
          location: "East Side",
          service: "Basement Waterproofing",
          date: "August 2023",
          category: "Residential",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
        },
        {
          name: "TechHub IT Park",
          location: "Cyber City",
          service: "Exterior Wall Waterproofing",
          date: "November 2023",
          category: "Commercial",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
        },
        {
          name: "Royal Enclave Villas",
          location: "South Hills",
          service: "Swimming Pool Waterproofing",
          date: "January 2024",
          category: "Residential",
          image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop",
        },
        {
          name: "MegaCorp Factory",
          location: "Industrial Area",
          service: "Industrial Waterproofing",
          date: "February 2024",
          category: "Industrial",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
        },
      ];

      for (const p of allProjects) {
        await sql`
          INSERT INTO projects (name, location, service, completion_date, category, image_url)
          VALUES (${p.name}, ${p.location}, ${p.service}, ${p.date}, ${p.category}, ${p.image})
        `;
      }
    }

    console.log("Database update complete!");
  } catch (err) {
    console.error("Database update failed:", err);
  }
}
main();
