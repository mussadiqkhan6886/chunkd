import SingleProduct from "@/components/mainComp/SingleProduct";
import React from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <SingleProduct slug={slug} />
  )
};

export default Page;
