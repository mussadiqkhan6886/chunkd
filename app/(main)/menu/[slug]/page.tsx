import { cookieData } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const findProduct = cookieData.find((item) => item.slug === slug);

  if (!findProduct) {
    return (
      <div className="h-screen pt-28 text-center text-4xl font-bold text-soft">
        No Product Found...
      </div>
    );
  }

  // Pick 3 random products excluding the current one
  const otherProducts = cookieData.filter((item) => item.slug !== slug);
  const shuffled = otherProducts.sort(() => 0.5 - Math.random());
  const suggestedProducts = shuffled.slice(0, 3);

  return (
    <main className="max-w-6xl mx-auto pt-32 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ⬅️ Product Image Placeholder */}
        <div className="w-full h-[420px] bg-soft/30 rounded-3xl shadow-inner animate-pulse"></div>

        {/* ➡️ Product Info */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            {findProduct.name}
          </h1>

          <p className="text-lg text-gray-600 mb-4">
            Flavour: <span className="font-semibold">{findProduct.flavour}</span>
          </p>

          {/* Price */}
          <p className="text-3xl font-bold mb-6 text-black">
            Rs {findProduct.price}
          </p>

          {/* Hot Seller */}
          {findProduct.hotSeller && (
            <p className="text-sm font-semibold text-pink-600 mb-4">
              🔥 Hot Seller
            </p>
          )}

          {/* Add to Box Button */}
          <button className="w-full px-8 py-4 rounded-xl bg-soft text-white font-bold text-lg hover:bg-soft/90 transition">
            Add to Box
          </button>
        </div>
      </div>

      {/* You may also like */}
      {suggestedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {suggestedProducts.map((cookie) => (
              <div
                key={cookie.id}
                className="border border-soft/40 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer"
              >
                <Link href={`/menu/${cookie.slug}`} className="w-full h-36 bg-soft/30 rounded-xl mb-4 animate-pulse flex items-center justify-center text-gray-500 font-semibold">
                  Image
                </Link>
                <h3 className="text-xl font-semibold mb-2">{cookie.name}</h3>
                <p className="text-gray-500 mb-2">{cookie.flavour}</p>
                <p className="text-primary font-bold">Rs {cookie.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Page;
