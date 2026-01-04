import LimitedCard from '@/components/mainComp/LimitedCard';
import { connectDB } from '@/lib/config/databse';
import CookieSchema from '@/lib/models/CookieSchema';
import type { Metadata } from "next";

export const revalidate = 60

export const metadata: Metadata = {
  title: "Limited Cookie Drops",
  description:
    "Explore Chunk’d Cookies limited drops – exclusive, small-batch stuffed cookies available for a short time only. Once they’re gone, they’re gone.",

  keywords: [
    "limited cookie drops",
    "chunkd cookies",
    "stuffed cookies",
    "gourmet cookies",
    "fresh baked cookies",
    "exclusive cookies",
    "small batch cookies",
    "premium cookies",
    "cookie drops",
    "dessert shop",
    "bakery cookies"
  ],

  alternates: {
    canonical: "/drops",
  },

  openGraph: {
    title: "Limited Cookie Drops | Chunk’d Cookies",
    description:
      "Don’t miss Chunk’d Cookies limited drops – exclusive, small-batch stuffed cookies available for a short time only.",
    url: "https://chunkdcookies.com/drops",
    siteName: "Chunk’d Cookies",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Chunk’d Cookies Limited Drops",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Limited Cookie Drops | Chunk’d Cookies",
    description:
      "Exclusive limited cookie drops by Chunk’d Cookies. Small-batch, stuffed cookies available for a short time only.",
    images: ["/logo.png"],
    creator: "@chunkdcookies",
  },
  category: "Food & Beverage",
};


const DropsPage = async () => {

  await connectDB();

  const res = await CookieSchema.find({category: "limited"}).lean()

  const data = JSON.parse(JSON.stringify(res))

  return (
    <main className="max-w-7xl mx-auto pt-30 p-5">

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-3">This Week’s Drops</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Limited-edition flavours dropping every week.  
        Once they are gone — they are gone. Stay ready, do not miss out.
      </p>

      {/* Drops Grid */}
      <div >
        <LimitedCard data={data} button={false} />
      </div>
    </main>
  );
};

export default DropsPage;
