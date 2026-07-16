"use server";

import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function createTable() {
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
    return { success: true, message: "Table created successfully" };
  } catch (error) {
    console.error("Error creating table:", error);
    return { success: false, message: "Failed to create table" };
  }
}

export async function submitLead(data: { name: string, phone: string, email?: string, propertyType: string, problemType: string, visitDate?: string }) {
  try {
    await sql`
      INSERT INTO submissions (type, name, phone, email, property_type, problem_type, visit_date)
      VALUES (
        'Inspection', 
        ${data.name}, 
        ${data.phone}, 
        ${data.email || null}, 
        ${data.propertyType}, 
        ${data.problemType}, 
        ${data.visitDate || null}
      )
    `;
    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false };
  }
}

export async function submitContact(data: { name: string, phone: string, email?: string, message: string }) {
  try {
    await sql`
      INSERT INTO submissions (type, name, phone, email, message)
      VALUES (
        'Contact', 
        ${data.name}, 
        ${data.phone}, 
        ${data.email || null}, 
        ${data.message}
      )
    `;
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact:", error);
    return { success: false };
  }
}

export async function getSubmissions() {
  try {
    const { rows } = await sql`SELECT * FROM submissions ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
}

// Admin Authentication Server Actions
export async function adminLogin(password: string, email: string) {
  if (email === "shuklatanu1245@gmail.com" && password === "water5454") {
    cookies().set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }
  return { success: false };
}

export async function adminLogout() {
  cookies().delete("admin_session");
  return { success: true };
}
