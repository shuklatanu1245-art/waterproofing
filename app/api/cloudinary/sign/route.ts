import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: "j7fxnobg",
  api_key: "859238226244396",
  api_secret: "nmKZ00hfpghmOSasvjDEbpE21t0",
});

export async function POST(request: Request) {
  // Ensure user is authenticated as admin
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const folder = body.folder || "waterproofing_site";

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      cloudinary.config().api_secret as string
    );

    return NextResponse.json({ timestamp, signature, folder });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
