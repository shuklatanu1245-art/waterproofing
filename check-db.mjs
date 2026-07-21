import { sql } from "@vercel/postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

async function main() {
  try {
    const res1 = await sql`SELECT COUNT(*) FROM services`;
    const res2 = await sql`SELECT COUNT(*) FROM process_steps`;
    const res3 = await sql`SELECT COUNT(*) FROM before_after_videos`;
    console.log('Services:', res1.rows[0].count);
    console.log('Steps:', res2.rows[0].count);
    console.log('Videos:', res3.rows[0].count);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
main();
