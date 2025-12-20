import { connectDB } from "@/lib/config/databse";
import { PasswordAdmin } from "@/lib/models/PasswordAdmin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const admin = await PasswordAdmin.findOne({});
  if (!admin) {
    return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });
  }

  const { password } = await req.json();

  const isValid = await bcrypt.compare(password, admin.password);

  if (!isValid) {
    return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
