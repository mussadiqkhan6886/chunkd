'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaSearch, FaCheck, FaClock } from 'react-icons/fa';
import { cookies } from '@/lib/constants';
import { useDrop } from '@/lib/context/contextAPI';
import AddToCart from '@/components/mainComp/AddToCart';


const MenuPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Available' | 'Pre-Order' | 'Sold Out'>('All');
  const [box, setBox] = useState<CookieType[]>([]);

  const filteredCookies = cookies.filter(cookie => {
    const matchesSearch = cookie.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || cookie.status === filter;
    return matchesSearch && matchesFilter;
  });

  const {getStatus} = useDrop()

  return (
    <main className="bg-secondary pt-24">
      {/* Header */}
      <div className='py-5 px-2'>
      <h1 className="text-4xl md:text-6xl font-bold mb-2 text-center">Find Your Next Craving</h1>
      <p className='text-center '>Discover our full lineup of Chunk’d cookies — from classics to limited-edition drops.
        <br />
        Filter, search, and explore every flavor. Add your favourites to your box and build the perfect treat.
      </p>
    </div>
      <div className="flex flex-row justify-between items-center px-5 md:px-10 py-4 mb-8 gap-4">
          <div className="flex items-center border border-soft bg-gray-100 rounded-lg p-2 px-3 w-full sm:w-auto">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search cookies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as any)}
            className="p-2 rounded-lg border border-gray-300 bg-white cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Pre-Order">Pre-Order</option>
            <option value="Sold Out">Sold Out</option>
          </select>
      </div>

      {/* Grid of Cookies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">
        {filteredCookies.map(cookie => {
          const status = getStatus(cookie)
  return cookie.soldOut ? (
    <div
      key={cookie.id}
      className="flex flex-col justify-between items-center text-center border border-soft relative opacity-60"
    >
      {/* Placeholder Image */}
      <div className="bg-soft/50 w-full h-[400px] flex items-center justify-center text-gray-400 font-bold">
        image
      </div>

      {/* Sold Out Badge */}
      <div className="absolute top-5 left-5 bg-black text-white px-3 py-1 rounded-full text-sm">
        SOLD OUT
      </div>

      <div className="p-1">
        <h2 className="text-xl font-semibold mb-1">{cookie.title}</h2>
        <p className="text-sm text-gray-500">Will Be Back Soon</p>
      </div>
    </div>
  ) : (
    <div
      key={cookie.id}
      className="flex flex-col  justify-between border border-soft relative"
    >
      {/* Image Placeholder */}
      <Link href={`/${cookie.category === "limited" ? "drops" : "menu"}/${cookie.slug}`} className="bg-soft/50 h-[400px] flex items-center justify-center text-gray-400 font-bold">
        Image
      </Link>

      {/* Hot Seller Badge */}
      {cookie.hotSeller && (
        <div className="bg-white/50 text-sm font-semibold px-2 py-1 absolute top-5 left-5">
          🔥 Best Seller
        </div>
      )}

      {/* Cookie Info */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 >{cookie.title}</h2>
          <h2 className="font-semibold text-lg md:text-xl">Rs.{cookie.price}</h2>
        </div>
        <div>
          <p className='text-gray-500 text-[13px]'>Category: {cookie.category}</p>
        </div>
         <AddToCart status={status} />
      </div>
    </div>
  );
})}

      </div>

      {/* Box Summary */}
      {box.length > 0 && (
        <div className="fixed bottom-5 right-5 bg-pink-600 text-white p-4 rounded-2xl shadow-lg w-64">
          <h3 className="font-bold mb-2">Your Box ({box.length})</h3>
          <ul className="text-sm">
            {box.map(item => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default MenuPage;
