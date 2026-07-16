import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        property_type VARCHAR(100),
        problem_type VARCHAR(100),
        visit_date VARCHAR(50),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table created");
  } catch (err) {
    console.error(err);
  }
}
main();
