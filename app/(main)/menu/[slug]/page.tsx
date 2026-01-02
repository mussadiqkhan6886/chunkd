import SingleProduct from "@/components/mainComp/SingleProduct";
import { connectDB } from "@/lib/config/databse";
import CookieSchema from "@/lib/models/CookieSchema";
import { Metadata } from "next";
import React from "react";

export const revalidate = 60;

export async function generateStaticParams() {
  await connectDB();

  const cookies = await CookieSchema.find({}, { slug: 1 }).lean();

  return cookies.map((cookie) => ({
    slug: cookie.slug,
  }));
}


export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

  await connectDB();

  const slug = (await params).slug

  const cookie = await CookieSchema.findOne({ slug: slug }).lean();

  if (!cookie) {
    return {
      title: "Cookie Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${cookie.title}`,
    description: cookie.description
      ?? `Order the ${cookie.title} from Chunk’d Cookies – thick, stuffed, freshly baked cookie and limited time offers.`,
    keywords: ["drops", "limited drop", "cookie", "limited time", "cookie", "time"],
    openGraph: {
      title: `${cookie.title} | Chunk’d Cookies`,
      description:
        cookie.description
        ?? `Delicious and mouth watering cookie, Order it now through our website anywhere in lahore.`,
      images: [
        {
          url: cookie.images[0],
          width: 1200,
          height: 630,
          alt: cookie.title,
        },
      ],
    },
  };
}

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
