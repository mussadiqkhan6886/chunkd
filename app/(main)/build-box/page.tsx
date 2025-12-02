'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDrop } from '@/lib/context/contextAPI';

const BuildYourBox = () => {
  const { addToCart, cart } = useDrop();
  const [boxSize, setBoxSize] = useState<4 | 6>(4);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [data, setData] = useState<CookieType[]>([]);

  const totalSelected = Object.values(quantities).reduce((sum, n) => sum + n, 0);

  // ---------------- INCREASE / DECREASE ----------------
  const increase = (id: string) => {
    if (totalSelected >= boxSize) return;
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrease = (id: string) => {
    if (!quantities[id]) return;
    setQuantities((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        { next: { revalidate: 60 } }
      );
      const json = await res.json();
      setData(json.data);
    };

    fetchData();
  }, []);

  // ---------------- BOX DATA STATE ----------------
  const [boxData, setBoxData] = useState({
    size: boxSize,
    cookies: [] as {
      id: string;
      title: string;
      image: string;
      qty: number;
      price: number;
    }[],
    totalPrice: 0,
  });

  // ---------------- UPDATE boxData WHEN QUANTITY CHANGES ----------------
  useEffect(() => {
    const selectedCookies = data
      .filter((item) => quantities[item._id] > 0)
      .map((item) => ({
        id: item._id,
        title: item.title,
        image: item.images[0],
        price: item.price,
        qty: quantities[item._id],
      }));

    const totalBoxPrice = selectedCookies.reduce(
      (sum, c) => sum + c.price * c.qty,
      0
    );

    setBoxData({
      size: boxSize,
      cookies: selectedCookies,
      totalPrice: totalBoxPrice,
    });
  }, [quantities, boxSize, data]);

  // ---------------- RENDER ----------------
  return (
    <main className="max-w-7xl mx-auto pt-28 p-5">
      {/* Heading */}
      <h1 className="text-6xl font-bold text-center mb-3">
        Build Your Box
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Create your perfect Chunk’d cookie box. Choose your box size, select your flavours,
        and watch your custom box come to life — freshly baked, your way.
      </p>

      {/* Box Size Selector */}
      <div className="flex justify-center gap-6 mb-12">
        {[4, 6].map((size) => (
          <button
            key={size}
            onClick={() => {
              setBoxSize(size as 4 | 6);
              setQuantities({});
              setBoxData((prev) => ({ ...prev, size }));
            }}
            className={`px-8 py-4 rounded-2xl border font-semibold text-xl transition 
              ${boxSize === size 
                ? 'bg-soft text-white border-soft' 
                : 'bg-white border-gray-300 hover:border-soft'}`}
          >
            Box of {size}
          </button>
        ))}
      </div>

      {/* Live Total */}
      <div className="text-center mb-10">
        <p className="text-lg font-medium">
          Selected: <span className="font-bold">{totalSelected}/{boxSize}</span>
        </p>
      </div>

      {/* Flavour Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((item: CookieType) => {
          const qty = quantities[item._id] || 0;

          const isAvailable = item.active && !item.soldOut;

          return (
            <div
              key={item._id}
              className="border max-w-[400px] border-soft/40 rounded-2xl p-5"
            >
              {/* Image */}
              <div className="h-[350px] bg-soft/30 rounded-xl mb-4 flex items-center justify-center">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={300}
                  height={350}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Title & Description */}
              <div className="flex justify-between flex-col items-center">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {item.description.length > 45
                      ? item.description.slice(0, 45) + '....'
                      : item.description}
                  </p>
                </div>
                <p>Rs. {item.price}</p>
              </div>

              {/* Available? Show + / -, else show "Will be back soon" */}
              {isAvailable ? (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => decrease(item._id)}
                    className="w-10 h-10 flex items-center justify-center text-xl border rounded-lg hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">{qty}</span>

                  <button
                    onClick={() => increase(item._id)}
                    className={`w-10 h-10 flex items-center justify-center text-xl border rounded-lg transition 
                      ${
                        totalSelected >= boxSize
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-soft hover:text-white'
                      }`}
                  >
                    +
                  </button>
                </div>
              ) : (
                <p className="text-center mt-4 text-red-500 font-semibold">
                  Will be back soon
                </p>
              )}
            </div>
          );
        })}
      </div>


      {/* Summary */}
      <div className="text-center mt-16 mb-20">
        <button
          onClick={() =>
            addToCart({
              id: `box-${Date.now()}`,
              type: "box",
              title: `Build Your Box (${boxData.size})`,
              price: boxData.totalPrice,
              quantity: 1,
              images: ["/box.png"],
              boxType: {
                size: boxData.size,
                boxTotalPrice: boxData.totalPrice,
                cookies: boxData.cookies,
              }
            })
          }
          disabled={totalSelected !== boxSize}
          className={`px-10 py-4 text-lg rounded-2xl font-semibold transition 
            ${
              totalSelected === boxSize
                ? 'bg-soft text-white hover:bg-soft/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          Continue — Build My Box
        </button>
      </div>
    </main>
  );
};

export default BuildYourBox;
