import { connectDB } from "@/lib/config/databse"
import CouponSchema from "@/lib/models/CouponSchema"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    await connectDB()
    const id = (await params).id
    try{
        await CouponSchema.findByIdAndDelete(id)
        return NextResponse.json({message: "Successfully Deleted Coupon"}, {status:200})
    }catch(err){
        return NextResponse.json({message: "Error Deleting Coupon"}, {status:200})
    }
}