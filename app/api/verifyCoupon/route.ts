import { connectDB } from "@/lib/config/databse"
import CouponSchema from "@/lib/models/CouponSchema"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  await connectDB();

  const { couponCode } = await req.json();

  const coupon = await CouponSchema.findOne({ code: couponCode });

  if (!coupon) {
    return NextResponse.json(
      { success: false, data: "INVALID COUPON CODE" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { success: true, data: coupon },
    { status: 200 }
  );
};
