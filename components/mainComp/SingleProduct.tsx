import React from 'react'
import Timer from './Timer';
import Link from 'next/link';
import Accordion from './According';
import AddToCart from './AddToCart';
import { connectDB } from '@/lib/config/databse';
import CookieSchema from '@/lib/models/CookieSchema';
import mongoose from 'mongoose';
import ImageSlider from './ImageSlider';
import Image from 'next/image';
import { DropType } from '@/type';

const SingleProduct = async ({data}: {data: DropType}) => {

  if (!data) {
    return (
      <div className="h-screen pt-28 text-center text-4xl font-bold text-soft">
        No Product Found...
      </div>
    );
  }

  await connectDB()

   const res = await CookieSchema.aggregate([
    {
      $match: {
        category: data.category,       // same category
        soldOut: false,
        active: true,           // only available products
        _id: { $ne: new mongoose.Types.ObjectId(data._id) }, // exclude current
      },
    },
    { $sample: { size: 3 } },     // pick random 3
  ]);

  return (
    <main className="max-w-6xl mx-auto pt-32 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ⬅️ Product Image Placeholder */}
        <div className="w-full h-full max-h-[570px]">
          <ImageSlider images={data.images} />
        </div>

        {/* ➡️ Product Info */}
        <div>
          {data.category === "limited" && <Timer releaseDate={data.releaseDate!} endDate={data.endDate!} soldOut={data.soldOut} active={data.active}  />}
          <h1 className="text-4xl md:text-5xl mt-3 capitalize font-extrabold mb-3">
            {data.title}
          </h1>

          <p className="text-lg text-gray-600 mb-4">
            Category: <span className="font-semibold">{data.category}</span>
          </p>

          {/* Price */}
          {data.price !== 0 && (<p className="text-3xl font-bold mb-6 text-black">
            Rs {data.price}
          </p>)}

          {/* Hot Seller */}
          {data.hotSeller && (
            <p className="text-sm font-semibold text-pink-600 mb-4">
              🔥 Hot Seller
            </p>
          )}

          {/* Add to Box Button */}
          {data.price !== 0 && <AddToCart releaseDate={data.releaseDate!} endDate={data.endDate!} soldOut={data.soldOut} active={data.active} data={data} />}
          <div className="mt-6 space-y-3">

            <Accordion title="Description">
                <p>{data.description}</p>
            </Accordion>

            <Accordion title="Heating Instructions">
                <p>{data.heating}</p>
            </Accordion>

            <Accordion title="Storage">
                <p>{data.storage}.</p>
            </Accordion>

            <Accordion title="Allergens">
                <p>{data.allergens.join(", ")}</p>
            </Accordion>

            </div>
        </div>
        {/* Accordions */}
            

      </div>

      {/* You may also like */}
      {res.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {res.map((cookie) => (
              <div
                key={cookie._id}
                className="border border-soft/40 p-4 flex flex-col items-left cursor-pointer"
              >
                <Link href={`/${cookie.category === "limited" ? "drops" : "menu"}/${cookie.slug}`} className="w-full h-full max-h-[330px] mb-4 hover:animate-pulse">
                  <Image src={cookie.images[0]} alt={cookie.title} width={200} height={250} className={"object-cover object-center w-full h-full"} />
                </Link>
                <div className="flex justify-between items-center w-full mb-2">
                  <h3 className="font-semibold capitalize">{cookie.title}</h3>
                  {cookie.price !== 0 && <p className="text-primary font-bold">Rs {cookie.price}</p>}
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {cookie.description.length > 48 ? cookie.description.slice(0, 48) + "..." : cookie.description}
                </p>
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
