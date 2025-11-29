'use client';

import { cookies } from '@/lib/constants';
import React from 'react'
import Timer from './Timer';
import Link from 'next/link';
import Accordion from './According';
import AddToCart from './AddToCart';
import { useDrop } from '@/lib/context/contextAPI';

const SingleProduct = ({slug}: {slug: string}) => {

  const findProduct = cookies.find((item) => item.slug === slug);

  if (!findProduct) {
    return (
      <div className="h-screen pt-28 text-center text-4xl font-bold text-soft">
        No Product Found...
      </div>
    );
  }

  // Pick 3 random products excluding the current one
  const otherProducts = cookies.filter((item) => item.slug !== slug && !item.soldOut && item.category === findProduct.category);
  const shuffled = otherProducts.sort(() => 0.5 - Math.random());
  const suggestedProducts = shuffled.slice(0, 3);
  const {getStatus} = useDrop()
  const status = getStatus(findProduct)

  return (
    <main className="max-w-6xl mx-auto pt-32 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ⬅️ Product Image Placeholder */}
        <div className="w-full h-[420px] bg-soft/50"></div>

        {/* ➡️ Product Info */}
        <div>
          {findProduct.category === "limited" && <Timer product={findProduct} />}
          <h1 className="text-4xl md:text-5xl mt-3 font-extrabold mb-3">
            {findProduct.title}
          </h1>

          <p className="text-lg text-gray-600 mb-4">
            Flavour: <span className="font-semibold">{findProduct.category}</span>
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
          <AddToCart status={status} />
          <div className="mt-6 space-y-3">

            <Accordion title="Heating Instructions">
                <p>{findProduct.heating}</p>
            </Accordion>

            <Accordion title="Storage">
                <p>{findProduct.storage}.</p>
            </Accordion>

            <Accordion title="Allergens">
                <p>{findProduct.allergens.join(", ")}</p>
            </Accordion>

            </div>
        </div>
        {/* Accordions */}
            

      </div>

      {/* You may also like */}
      {suggestedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {suggestedProducts.map((cookie) => (
              <div
                key={cookie.id}
                className="border border-soft/40 p-4 flex flex-col items-left cursor-pointer"
              >
                <Link href={`/menu/${cookie.slug}`} className="w-full h-46 bg-soft/30 mb-4 animate-pulse flex items-center justify-center text-gray-500 font-semibold">
                  Image
                </Link>
                <div className="flex justify-between items-center w-full mb-2">
                  <h3 className="font-semibold">{cookie.title}</h3>
                  <p className="text-primary font-bold">Rs {cookie.price}</p>
                </div>
                <p className="text-gray-500 text-[13px] text-left mb-2">Category: {cookie.category}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default SingleProduct
