import FilterClient from "@/components/mainComp/Filteration";
import { connectDB } from "@/lib/config/databse";
import CookieSchema from "@/lib/models/CookieSchema";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cookies Menu",
  description: "Explore Chunk’d Cookies menu featuring thick, stuffed cookies, classic flavors, and limited-time drops baked fresh with premium ingredients.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Cookie Menu | Chunk'd Cookies",
    description: "Explore Chunk’d Cookies menu featuring thick, stuffed cookies, classic flavors, and limited-time drops baked fresh daily.",
    url: "/menu",
    siteName: "Chunk'd Cookies",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Chunk'd Cookies Menu Preview - stuffed, fresh, baked cookies",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Menu | Chunk'd Cookies",
    description: "View Chunk’d Cookies menu: thick, stuffed cookies, classic flavors, and limited-time drops baked fresh daily.",
    images: ["/logo.png"],
    creator: "@chunkdcookies",
  },
};


const MenuPage = async () => {

  await connectDB()

  const res = await CookieSchema.find({}).lean()

  const cookies = JSON.parse(JSON.stringify(res))

  return (
    <main className="bg-secondary pt-24">
      <div className="py-5 px-2">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-center">
          Find Your Next Craving
        </h1>
        <p className="text-center">
          Discover our full lineup of Chunk’d cookies — from classics to
          limited-edition drops.
          <br />
          Filter, search, and explore every flavor. Build the perfect treat.
        </p>
      </div>

      <FilterClient cookies={cookies} />
    </main>
  );
};

export default MenuPage;
