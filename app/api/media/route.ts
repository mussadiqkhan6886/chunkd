import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/databse";
import { NextRequest, NextResponse } from "next/server";
import { Media } from "@/lib/models/MediaSchema";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const media = await Media.find({});
    return NextResponse.json({ success: true, data: media }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // ✅ SINGLE file
    const file = formData.get("img");
    const height = Number(formData.get("height"));

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 }
      );
    }

    if (!height) {
      return NextResponse.json(
        { success: false, message: "Height is required" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "chunkd",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // Save to MongoDB
    const media = await Media.create({
      img: uploadResult.secure_url,
      height,
    });

    return NextResponse.json(
      { success: true, data: media },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}