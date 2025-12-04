'use client';

import { cookies } from '@/lib/constants';
import { useDrop } from '@/lib/context/contextAPI';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AddToCart from './AddToCart';
import Image from 'next/image';

type Props = {
  data: CookieType[],
  button: boolean
}

const LimitedCard = ({ data, button }: Props) => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { getStatus, getCountdown } = useDrop();

  return (
    <>
      <div>
        {data.length > 0 ? (
          <div className="grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 gap-14">

            {data.map((drop: CookieType) => {
              const status = getStatus(drop.releaseDate!, drop.endDate!, drop.soldOut, drop.active);
              const countdown = getCountdown(drop.releaseDate!);
              const release = new Date(drop.releaseDate!);

              return (
                <div
                  key={drop._id}
                  className="border relative md:w-[400px] border-soft/40 rounded-2xl overflow-hidden bg-white"
                >
                  {/* Image Section */}
                  {drop.soldOut || !drop.active ? (
                    <div className='h-74 relative'>
                      <Image src={drop.images[0]} alt={drop.title} width={300} height={350} className='object-center object-cover w-full h-full' />
                      <div className='bg-black/40 h-full top-0 left-0 w-full absolute text-white font-bold text-2xl flex items-center justify-center'>
                        Out Of Stock
                      </div>
                    </div>
                  ) : (
                    <Link href={`/drops/${drop.slug}`} className="h-74 block">
                      <Image src={drop.images[0]} alt={drop.title} width={300} height={350} className='object-center object-cover w-full h-full' />
                    </Link>
                  )}

                  {/* Info */}
                  <div className="p-6">
                    <div className='flex justify-between mb-1 items-center'>
                      <h2 className="text-xl md:text-3xl font-bold">{drop.title}</h2>
                      <h2 className='font-semibold text-lg'>Rs.{drop.price}</h2>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {drop.description.length > 50 ? drop.description.slice(0, 50) + "..." : drop.description}
                    </p>

                    {/* Status Badge */}
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4
                        ${status === "Coming Soon" ? "bg-yellow-200 text-yellow-800"
                          : status === "Live" ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"}`}
                    >
                      {status}
                    </span>

                    {/* Countdown */}
                    {mounted && status === "Coming Soon" && (
                      <div className="mt-2 text-lg font-bold text-soft">
                        {countdown}
                      </div>
                    )}

                    {/* CTA */}
                    <AddToCart
                      releaseDate={drop.releaseDate!}
                      endDate={drop.endDate!}
                      soldOut={drop.soldOut}
                      active={drop.active}
                      data={drop}
                    />

                    {/* Release Date */}
                    <p className="text-sm text-gray-500 mt-4">
                      {mounted && "Drops on " + release.toDateString()}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        ) : (
          <div>
            <hr />
            <p className='text-gray-600  py-2 text-center font-semibold'>No Drops Yet</p>
            <hr />
          </div>
        )}
      </div>

      {/* SHOW VIEW ALL BUTTON IF MORE THAN 4 ITEMS */}
      {(data.length > 4 && button) && (
        <Link href={"/drops"} className='discoverButtonStyle mt-7'>
          View All
        </Link>
      )}
    </>
  );
};

export default LimitedCard;
