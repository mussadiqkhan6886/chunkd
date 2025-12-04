import { connectDB } from "@/lib/config/databse";
import DeliveryChargesSchema from "@/lib/models/DeliveryChargesSchema";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();
  const id = (await params).id;

  try {
    await DeliveryChargesSchema.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error deleting city" },
      { status: 500 }
    );
  }
};
