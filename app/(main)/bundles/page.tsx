import FilterClient from '@/components/mainComp/Filteration'
import { connectDB } from '@/lib/config/databse'
import CookieSchema from '@/lib/models/CookieSchema'
import { Metadata } from 'next';
import React from 'react'

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cookies Bundle",
  description: "Explore Chunk’d Cookies Bundle featuring thick, stuffed cookies, classic flavors, and deals bundle baked fresh with premium ingredients.",
  alternates: { canonical: "/bundles" },
  openGraph: {
    title: "Cookie Bundles | Chunk'd Cookies",
    description: "Explore Chunk’d Cookies Bundles featuring thick, stuffed cookies, classic flavors, and limited-time drops baked fresh daily.",
    url: "/bundles",
    siteName: "Chunk'd Cookies",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Chunk'd Cookies Bundle Preview - stuffed, fresh, baked cookies",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Bundle | Chunk'd Cookies",
    description: "View Chunk’d Cookies Bundle: thick, stuffed cookies, classic flavors, and limited-time drops baked fresh daily.",
    images: ["/logo.png"],
    creator: "@chunkdcookies",
  },
};

const page = async () => {
  await connectDB()
  
    const res = await CookieSchema.find({category: 'bundle'}).lean()
  
    const cookies = JSON.parse(JSON.stringify(res))
  
    return (
      <main className="bg-secondary pt-24">
        <div className="py-5 px-2">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-center">
            Find Your Next Craving Bundle
          </h1>
          <p className="text-center">
            Discover our full lineup of Chunk’d cookies bundle from classics to
            limited-edition bundle.
            <br />
            Filter, search, and explore every flavor. Build the perfect treat.
          </p>
        </div>
  
        <FilterClient cookies={cookies} />
      </main>
    );
}

export default page
