'use client';

import { cookies } from '@/lib/constants';
import { useDrop } from '@/lib/context/contextAPI';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import AddToCart from './AddToCart';

type Props = {
  data: any,
  button: boolean
}

const LimitedCard = ({data, button}: Props) => {

  const [mounted ,setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const {getStatus, getCountdown} = useDrop()

  return (
    <>
    <div className="grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 gap-10">
      {data.map((drop: CookieType) => {
          const status = getStatus(drop);
          const countdown = getCountdown(drop);
          const release = new Date(drop.releaseDate);

          return (
            <div
              key={drop.id}
              className="border border-soft/40 rounded-2xl overflow-hidden bg-white"
            >
              {/* Image Placeholder */}
              { drop.soldOut ? <div className="h-70 bg-soft/30 flex items-center justify-center text-gray-500 font-semibold">
                Limited Drop Image
              </div> : <Link href={`/drops/${drop.slug}`} className="h-70 bg-soft/30 flex items-center justify-center text-gray-500 font-semibold">
                Limited Drop Image
              </Link>}

              {/* Info */}
              <div className="p-6">
                <div className='flex justify-between mb-1 items-center'>
                <h2 className="text-xl md:text-3xl font-bold ">{drop.title}</h2>
                <h2 className='font-semibold text-lg'>Rs.{drop.price}</h2>
                </div>
                <p className="text-gray-600 mb-4">{drop.description}</p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4
                  ${
                    status === "Coming Soon"
                      ? "bg-yellow-200 text-yellow-800"
                      : status === "Live"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200  text-red-800"
                  }`}
                >
                  {status}
                </span>

                {/* Countdown */}
                {mounted && status === "Coming Soon" && (
                  <div className="mt-2 text-lg font-bold text-soft">
                    {countdown}
                  </div>
                )}

                {/* CTA Button */}
                <AddToCart status={status} />

                {/* Release Date */}
                <p className="text-sm text-gray-500 mt-4">
                  {mounted && "Drops on " + release.toDateString()}
                </p>
              </div>
            </div>
          );
        })}
        </div>
        {(cookies.length > 4 && button) && <Link href={"/drops"} className='discoverButtonStyle mt-7'>View All</Link>}
    </>
  )
}

export default LimitedCard
