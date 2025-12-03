import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/databse";
import cloudinary from "@/lib/config/cloudinary";
import CookieSchema from "@/lib/models/CookieSchema";

export const runtime = "nodejs"; // Required for Cloudinary uploads

export const GET = async () => {
  await connectDB();
  try {
    const res = await CookieSchema.find({category: "limited"});
    return NextResponse.json({ message: "Fetched Data", data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch data", error }, { status: 400 });
  }
};

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
     const allergens = formData
    .getAll("allergens")
    .filter((x): x is string => typeof x === "string")
    .map((x) => JSON.parse(x));
    const allowedForBox = formData.get("allowedForBox") === "true"
    const storage = formData.get("storage") as string
    const heating = formData.get("heating") as string
    const releaseDate = formData.get("releaseDate")
    const endDate = formData.get("endDate")
    const durationDays = formData.get("durationDays")
    const totalLimit = formData.get("totalLimit")
    const files = formData.getAll("images") as File[];
    
    if (!totalLimit || !title || !description || !price) {
      throw new Error("Missing required fields");
    }
    
    if (!files || files.length === 0) {
      throw new Error("No images uploaded");
    }

    const uploadedImages: string[] = [];
    
    for (const file of files) {
      if (!(file instanceof File)) {
        throw new Error("Invalid file format");
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const uploadResult: any = await new Promise((resolve, reject) => {
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
        
        uploadedImages.push(uploadResult.secure_url);
      }
      
      const newProduct = new CookieSchema({
        title,
        slug,
        description,
        price,
        category,
        allergens,
        storage,
        heating,
        releaseDate,
        endDate,
        durationDays,
        totalLimit,
        allowedForBox,
        images: uploadedImages,
    });
    await newProduct.save();

    return NextResponse.json(
      { success: true, message: "Product added successfully!", data: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}

