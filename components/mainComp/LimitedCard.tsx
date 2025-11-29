'use client';

import { dropsData } from '@/lib/constants';
import React, { useEffect, useState } from 'react'

const LimitedCard = () => {
    const [now, setNow] = useState(new Date());

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
    setMounted(true);
    }, []);


  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  //@ts-ignore
  const getStatus = (drop: any) => {
    const release = new Date(drop.releaseDate);
    const end = new Date(release);
    end.setDate(end.getDate() + drop.durationDays);

    if (now < release) return "Coming Soon";
    if (now >= release && now < end && !drop.soldOut) return "Live";
    return "Sold Out";
  };

  //@ts-ignore
  const getCountdown = (drop: any) => {
    const release = new Date(drop.releaseDate);
    const diff = release.getTime() - now.getTime();

    if (diff <= 0) return "00 : 00 : 00 : 00";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return `${d}d : ${h}h : ${m}m : ${s}s`;
  };
  return (
    <>
      {dropsData.map((drop) => {
          const status = getStatus(drop);
          const countdown = getCountdown(drop);
          const release = new Date(drop.releaseDate);

          return (
            <div
              key={drop.id}
              className="border border-soft/40 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              {/* Image Placeholder */}
              <div className="h-70 bg-soft/30 flex items-center justify-center text-gray-500 font-semibold">
                Limited Drop Image
              </div>

              {/* Info */}
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-1">{drop.title}</h2>
                <p className="text-gray-600 mb-4">{drop.description}</p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4
                  ${
                    status === "Coming Soon"
                      ? "bg-yellow-200 text-yellow-800"
                      : status === "Live"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
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
                {status === "Coming Soon" && (
                  <button className="mt-5 w-full py-3 rounded-xl bg-black text-white font-semibold ">
                    Pre-Order
                  </button>
                )}

                {status === "Live" && !drop.soldOut && (
                  <button className="mt-5 w-full py-3 rounded-xl bg-soft text-white font-semibold hover:bg-soft/90 transition">
                    Buy Now
                  </button>
                )}

                {status === "Sold Out" && (
                  <button className="mt-5 w-full py-3 rounded-xl bg-gray-300 text-gray-600 font-semibold cursor-not-allowed">
                    Sold Out
                  </button>
                )}

                {/* Release Date */}
                <p className="text-sm text-gray-500 mt-4">
                  {mounted && "Drops on " + release.toDateString()}
                </p>
              </div>
            </div>
          );
        })}
    </>
  )
}

export default LimitedCard
