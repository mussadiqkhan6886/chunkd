import { connectDB } from "@/lib/config/databse";
import cloudinary from "@/lib/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { Media } from "@/lib/models/MediaSchema";

export const runtime = "nodejs";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const {id} = await params

    const media = await Media.findById(id);
    if (!media) {
      return NextResponse.json(
        { success: false, message: "Media not found" },
        { status: 404 }
      );
    }

    /* OPTIONAL: delete from cloudinary */
    const publicId = media.img.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`chunkd/${publicId}`);
    }

    await Media.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}
