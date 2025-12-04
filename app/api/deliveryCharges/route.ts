import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/databse";
import DeliveryChargesSchema from "@/lib/models/DeliveryChargesSchema";

export const GET = async () => {
  await connectDB();
  const charges = await DeliveryChargesSchema.find();
  return NextResponse.json(charges);
};

export const POST = async (req: Request) => {
  await connectDB();

  try {
    const { city, charge } = await req.json();

    if (!city || charge === undefined)
      return NextResponse.json(
        { message: "City & charge are required" },
        { status: 400 }
      );

    const existing = await DeliveryChargesSchema.findOne({ city });
    if (existing)
      return NextResponse.json(
        { message: "City already exists" },
        { status: 400 }
      );

    const newCharge = await DeliveryChargesSchema.create({ city, charge });

    return NextResponse.json(newCharge, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error adding city" }, { status: 500 });
  }
};
