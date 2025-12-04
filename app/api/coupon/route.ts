import { connectDB } from "@/lib/config/databse";
import CouponSchema from "@/lib/models/CouponSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST =  async (req: NextRequest) => {
  await connectDB();
    try {
      const { code, discount } = await req.json();

      if (!code || !discount) {
        return NextResponse.json({message: "Code And Discount Required", success: false}, {status: 404});
      }

      // Check if coupon already exists
      const existing = await CouponSchema.findOne({ code: code.toUpperCase() });
      if (existing) return NextResponse.json({message: "Coupon Code Already exist", success: false}, {status: 404});

      const coupon = await CouponSchema.create({ code: code.toUpperCase(), discount });
      return NextResponse.json({message: "Successfully added coupon", success: true, coupon}, {status: 200})
    } catch (err: any) {
      return NextResponse.json({ message: err.message, success: false }, {status: 202});
    }
}

export const GET = async () => {
    await connectDB()
     try {
      const coupons = await CouponSchema.find().sort({ createdAt: -1 });
      return NextResponse.json(coupons, {status: 200});
    } catch (err: any) {
      return NextResponse.json({ message: err.message });
    }
}
