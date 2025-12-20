import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/databse";
import { NextRequest, NextResponse } from "next/server";
import { Media } from "@/lib/models/MediaSchema";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const media = await Media.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: media });
  } catch {
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
    const file = formData.get("media");
    const height = Number(formData.get("height"));

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Media file is required" },
        { status: 400 }
      );
    }

    if (!height) {
      return NextResponse.json(
        { success: false, message: "Height is required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const isVideo = file.type.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "chunkd",
            resource_type: isVideo ? "video" : "image",

            // 🔥 VIDEO OPTIMIZATION
            ...(isVideo && {
              transformation: [
                { quality: "auto" },
                { fetch_format: "mp4" },
                { width: 1280, crop: "limit" },
                { video_codec: "h264" },
              ],
            }),

            // 🔥 IMAGE OPTIMIZATION
            ...(!isVideo && {
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            }),
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const media = await Media.create({
      media: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      mediaType,
      height,
    });

    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
