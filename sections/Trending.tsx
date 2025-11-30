import { connectDB } from '@/lib/config/databse'
import CookieSchema from '@/lib/models/CookieSchema'
import Link from 'next/link'
import React from 'react'

const Trending = async () => {
  await connectDB()

  const res = await CookieSchema.aggregate([
    {
      $match: {
        hotSeller: true,
        soldOut: false,
        active: true
      }
    },
    { $sample: { size: 4 } } // random 4 products
  ]);

  const data = JSON.parse(JSON.stringify(res))

  return (
    <section className="width">
      <h2 className="sectionTitle">Best Seller</h2>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-6">

          {data.map((cookie: CookieType) => (
            <div
              key={cookie._id}
              className="flex flex-col p-6 lg:p-10 items-center gap-6 border border-soft/30"
            >

              {/* Image / Sold Out */}
              {cookie.soldOut || !cookie.active ? (
                <div className="relative w-full h-[450px] bg-soft/50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <p className="text-white font-bold text-2xl">Sold Out</p>
                  </div>
                </div>
              ) : (
                <Link
                  href={`/${cookie.category === "limited" ? "drops" : "menu"}/${cookie.slug}`}
                  className="w-full block h-[450px] bg-soft/50"
                >
                  {/* <Image src="" /> */}
                </Link>
              )}

              {/* Title + Price */}
              <div className="text-center px-3">
                <h3 className="text-xl font-semibold">{cookie.title}</h3>
                <h4 className="text-2xl font-[200]">Rs. {cookie.price}</h4>
              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="text-center text-gray-600 font-semibold text-lg">
          <hr />
          <p className='py-2 uppercase'> No Best Selling Cookies Yet</p>
          <hr />
        </div>
      )}
    </section>
  );
};

export default Trending;
