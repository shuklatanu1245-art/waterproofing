"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
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
      CREATE TABLE IF NOT EXISTS process_steps (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(500),
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS staff_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        logo_url VARCHAR(500)
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

export async function submitFeedback(data: { name: string, phone: string, message: string }) {
  try {
    await sql`
      INSERT INTO submissions (type, name, phone, message)
      VALUES (
        'Feedback', 
        ${data.name}, 
        ${data.phone}, 
        ${data.message}
      )
    `;
    return { success: true };
  } catch (error) {
    console.error("Error submitting feedback:", error);
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
      maxAge: 60 * 60 * 24 * 30, // 30 days
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

// Staff Authentication
export async function staffLogin(password: string, email: string) {
  try {
    const { rows } = await sql`SELECT * FROM staff_users WHERE email = ${email} AND password = ${password}`;
    if (rows.length > 0) {
      cookies().set("staff_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days persistent login
        path: "/",
      });
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("Error during staff login:", err);
    return { success: false };
  }
}

export async function staffLogout() {
  cookies().delete("staff_session");
  return { success: true };
}

// CMS Actions - Services
export async function getServices() {
  try {
    const { rows } = await sql`SELECT * FROM services ORDER BY display_order ASC`;
    return rows;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function addService(data: { title: string, icon: string, description: string, display_order: number, image_url?: string }) {
  try {
    const imageUrl = data.image_url || null;
    await sql`
      INSERT INTO services (title, icon, description, display_order, image_url)
      VALUES (${data.title}, ${data.icon}, ${data.description}, ${data.display_order}, ${imageUrl})
    `;
    return { success: true };
  } catch (error) {
    console.error("Error adding service:", error);
    return { success: false };
  }
}

export async function deleteService(id: number) {
  try {
    await sql`DELETE FROM services WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false };
  }
}

// CMS Actions - Before/After Videos
export async function getBeforeAfterVideos() {
  try {
    const { rows } = await sql`SELECT * FROM before_after_videos ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export async function addBeforeAfterVideo(data: { title: string, beforeUrl: string, afterUrl: string, description: string }) {
  try {
    await sql`
      INSERT INTO before_after_videos (title, before_video_url, after_video_url, description)
      VALUES (${data.title}, ${data.beforeUrl}, ${data.afterUrl}, ${data.description})
    `;
    return { success: true };
  } catch (error) {
    console.error("Error adding video:", error);
    return { success: false };
  }
}

export async function deleteBeforeAfterVideo(id: number) {
  try {
    await sql`DELETE FROM before_after_videos WHERE id = ${id}`;
    revalidatePath("/admin/dashboard/videos");
    revalidatePath("/");
    revalidatePath("/gallery");
    return { success: true };
  } catch (err) {
    console.error("Error deleting video:", err);
    return { error: "Failed to delete video" };
  }
}

export async function getTestimonials() {
  try {
    const { rows } = await sql`SELECT * FROM testimonials ORDER BY created_at DESC`;
    return rows;
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return [];
  }
}

export async function addTestimonial(name: string, role: string, text: string) {
  try {
    await sql`
      INSERT INTO testimonials (name, role, text)
      VALUES (${name}, ${role}, ${text})
    `;
    revalidatePath("/admin/dashboard/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Error adding testimonial:", err);
    return { error: "Failed to add testimonial" };
  }
}

export async function deleteTestimonial(id: number) {
  try {
    await sql`DELETE FROM testimonials WHERE id = ${id}`;
    revalidatePath("/admin/dashboard/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Error deleting testimonial:", err);
    return { error: "Failed to delete testimonial" };
  }
}

export async function getGalleryPhotos() {
  try {
    const { rows } = await sql`SELECT * FROM gallery_photos ORDER BY display_order ASC`;
    return rows;
  } catch (err) {
    console.error("Error fetching photos:", err);
    return [];
  }
}

export async function addGalleryPhoto(title: string, image_url: string, display_order: number = 0) {
  try {
    await sql`
      INSERT INTO gallery_photos (title, image_url, display_order)
      VALUES (${title}, ${image_url}, ${display_order})
    `;
    revalidatePath("/admin/dashboard/photos");
    revalidatePath("/gallery");
    return { success: true };
  } catch (err) {
    console.error("Error adding photo:", err);
    return { error: "Failed to add photo" };
  }
}

export async function deleteGalleryPhoto(id: number) {
  try {
    await sql`DELETE FROM gallery_photos WHERE id = ${id}`;
    revalidatePath("/admin/dashboard/photos");
    revalidatePath("/gallery");
    return { success: true };
  } catch (err) {
    console.error("Error deleting photo:", err);
    return { error: "Failed to delete photo" };
  }
}

// CMS Actions - Process Steps
export async function getProcessSteps() {
  try {
    const { rows } = await sql`SELECT * FROM process_steps ORDER BY display_order ASC, id ASC`;
    return rows;
  } catch (err) {
    console.error("Error fetching process steps:", err);
    return [];
  }
}

export async function addProcessStep(title: string, description: string, image_url: string, display_order: number = 0) {
  try {
    await sql`
      INSERT INTO process_steps (title, description, image_url, display_order)
      VALUES (${title}, ${description}, ${image_url}, ${display_order})
    `;
    revalidatePath("/admin/dashboard/process");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Error adding process step:", err);
    return { error: "Failed to add process step" };
  }
}

export async function deleteProcessStep(id: number) {
  try {
    await sql`DELETE FROM process_steps WHERE id = ${id}`;
    revalidatePath("/admin/dashboard/process");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Error deleting process step:", err);
    return { error: "Failed to delete process step" };
  }
}

// CMS Actions - Staff Users
export async function getStaff() {
  try {
    const { rows } = await sql`SELECT id, name, email, created_at FROM staff_users ORDER BY created_at DESC`;
    return rows;
  } catch (err) {
    console.error("Error fetching staff:", err);
    return [];
  }
}

export async function addStaff(name: string, email: string, password: string) {
  try {
    // Check if email already exists
    const existing = await sql`SELECT * FROM staff_users WHERE email = ${email}`;
    if (existing.rows.length > 0) {
      return { error: "Email already exists" };
    }
    await sql`
      INSERT INTO staff_users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;
    revalidatePath("/admin/dashboard/staff");
    return { success: true };
  } catch (err) {
    console.error("Error adding staff:", err);
    return { error: "Failed to add staff member" };
  }
}

export async function deleteStaff(id: number) {
  try {
    await sql`DELETE FROM staff_users WHERE id = ${id}`;
    revalidatePath("/admin/dashboard/staff");
    return { success: true };
  } catch (err) {
    console.error("Error deleting staff:", err);
    return { error: "Failed to delete staff member" };
  }
}

// CMS Actions - Site Settings
export async function getLogo() {
  try {
    const { rows } = await sql`SELECT logo_url FROM site_settings WHERE id = 1`;
    if (rows.length > 0) {
      return rows[0].logo_url;
    }
    return null;
  } catch (err) {
    console.error("Error fetching logo:", err);
    return null;
  }
}

export async function updateLogo(url: string | null) {
  try {
    const { rowCount } = await sql`UPDATE site_settings SET logo_url = ${url} WHERE id = 1`;
    if (rowCount === 0) {
      await sql`INSERT INTO site_settings (id, logo_url) VALUES (1, ${url})`;
    }
    revalidatePath("/");
    revalidatePath("/admin/dashboard/settings");
    return { success: true };
  } catch (err) {
    console.error("Error updating logo:", err);
    return { success: false };
  }
}
