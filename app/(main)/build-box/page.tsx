'use client';

import React, { useState } from 'react';

type Flavour = {
  id: number;
  name: string;
  description: string;
  price: string
};

const flavours: Flavour[] = [
  { id: 1,price: "200", name: "Chocolate Chip", description: "Classic gooey goodness" },
  { id: 2,price: "200", name: "Red Velvet", description: "Rich and smooth cocoa" },
  { id: 3,price: "200", name: "Double Chocolate", description: "A chocoholic’s dream" },
  { id: 4,price: "200", name: "Peanut Butter", description: "Nutty, soft & creamy" },
  { id: 5,price: "200", name: "Birthday Sprinkle", description: "Colourful & fun" },
  { id: 6,price: "200", name: "Lotus Biscoff", description: "Caramel cookie bliss" },
];

const BuildYourBox = () => {
  const [boxSize, setBoxSize] = useState<4 | 6>(4);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const totalSelected = Object.values(quantities).reduce((sum, n) => sum + n, 0);

  const increase = (id: number) => {
    if (totalSelected >= boxSize) return; // block if full
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrease = (id: number) => {
    if (!quantities[id]) return;
    setQuantities((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

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
              setQuantities({}); // reset when switching
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
        {flavours.map((item) => {
          const qty = quantities[item.id] || 0;

          return (
            <div
              key={item.id}
              className="border border-soft/40 rounded-2xl p-5 "
            >
              {/* Image Placeholder */}
              <div className="h-[300px] bg-soft/30 rounded-xl mb-4 flex items-center justify-center text-gray-500 font-semibold">
                Image
              </div>

              {/* Info */}
              <div className='flex justify-between items-center'>
                <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                </div>
                <p>Rs. {item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => decrease(item.id)}
                  className="w-10 h-10 flex items-center justify-center text-xl border rounded-lg hover:bg-gray-100"
                >
                  -
                </button>

                <span className="text-xl font-bold">{qty}</span>

                <button
                  onClick={() => increase(item.id)}
                  className={`w-10 h-10 flex items-center justify-center text-xl border rounded-lg transition 
                    ${totalSelected >= boxSize ? 'opacity-40 cursor-not-allowed' : 'hover:bg-soft hover:text-white'}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="text-center mt-16 mb-20">
        <button
          disabled={totalSelected !== boxSize}
          className={`px-10 py-4 text-lg rounded-2xl font-semibold transition 
            ${totalSelected === boxSize 
              ? 'bg-soft text-white hover:bg-soft/90' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          Continue — Build My Box
        </button>
      </div>
    </main>
  );
};

export default BuildYourBox;
