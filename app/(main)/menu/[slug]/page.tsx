import SingleProduct from "@/components/mainComp/SingleProduct";
import { connectDB } from "@/lib/config/databse";
import CookieSchema from "@/lib/models/CookieSchema";
import React from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  await connectDB()
  
  const res = await CookieSchema.find({slug: slug}).lean()
  
  const data = JSON.parse(JSON.stringify(res))

  return (
    <SingleProduct data={data[0]} />
  )
};

export default Page;
