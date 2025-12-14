import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/databse";
import Testimonial from "@/lib/models/Testimonials";

export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connectDB(); 

    const { id } = await params;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting testimonial", error: error.message },
      { status: 500 }
    );
  }
};

export const PATCH = async (_req: NextRequest, {params}: {params: Promise<{id: string}>}) => {

  try{
     await connectDB()

    const {id} = await params

    if(!id){
      return NextResponse.json({success: false, message: "Id Required"}, {status: 404})
    }

    const review = await Testimonial.findByIdAndUpdate(id, {approved: true}, {new: true})

    if(!review){
      return NextResponse.json({success: false, message: "No Review Found"}, {status: 404})
    }

    return NextResponse.json({success: true, message: "Review Updated"}, {status: 200})
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("APPROVING error:", error);
    return NextResponse.json(
      { success: false, message: "Error APPROVING testimonial", error: error.message },
      { status: 500 }
    );
  }

}
