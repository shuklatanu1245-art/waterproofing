import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    
    let res = await client.query('SELECT * FROM services');
    console.log(res.rows.length, 'services found');
    if (res.rows.length === 0) {
      console.log('Inserting services...');
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
        await client.query(
          `INSERT INTO services (title, icon, description, display_order) VALUES ($1, $2, $3, $4)`,
          [svc.title, svc.icon, svc.desc, svc.order]
        );
      }
      console.log('Services inserted.');
    }

    res = await client.query('SELECT * FROM gallery_photos');
    console.log(res.rows.length, 'photos found');
    if (res.rows.length === 0) {
      console.log('Inserting photos...');
      const initialPhotos = [
        { title: "Project 1", url: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", order: 1 },
        { title: "Project 2", url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop", order: 2 },
        { title: "Project 3", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop", order: 3 },
        { title: "Project 4", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop", order: 4 },
        { title: "Project 5", url: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?q=80&w=800&auto=format&fit=crop", order: 5 },
        { title: "Project 6", url: "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=800&auto=format&fit=crop", order: 6 },
      ];
      for (const p of initialPhotos) {
        await client.query(`INSERT INTO gallery_photos (title, image_url, display_order) VALUES ($1, $2, $3)`, [p.title, p.url, p.order]);
      }
      console.log('Photos inserted.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
