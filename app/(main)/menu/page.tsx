'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaSearch, FaCheck, FaClock } from 'react-icons/fa';

type Cookie = {
  id: number;
  name: string;
  flavour: string;
    price: string
  status: 'Available' | 'Pre-Order' | 'Sold Out';
  hotSeller: boolean,
};

const cookieData: Cookie[] = [
  { id: 1, price: "200", hotSeller: true, name: 'Chocolate Chip', flavour: 'Classic', status: 'Available' },
  { id: 2, price: "200", hotSeller: false, name: 'Red Velvet', flavour: 'Berry', status: 'Pre-Order' },
  { id: 3, price: "200", hotSeller: false, name: 'Oatmeal Raisin', flavour: 'Healthy', status: 'Sold Out' },
  { id: 4, price: "200", hotSeller: false, name: 'Peanut Butter', flavour: 'Nutty', status: 'Available' },
  { id: 5, price: "200", hotSeller: true, name: 'Double Chocolate', flavour: 'Choco', status: 'Pre-Order' },
  { id: 6, price: "200", hotSeller: false, name: 'Sugar Cookie', flavour: 'Sweet', status: 'Available' },
];

const MenuPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Available' | 'Pre-Order' | 'Sold Out'>('All');
  const [box, setBox] = useState<Cookie[]>([]);

  const filteredCookies = cookieData.filter(cookie => {
    const matchesSearch = cookie.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || cookie.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddToBox = (cookie: Cookie) => {
    if (!box.find(c => c.id === cookie.id)) {
      setBox([...box, cookie]);
    }
  };

  return (
    <main className="bg-secondary pt-24">
      {/* Header */}
      <div className='py-5'>
      <h1 className="text-6xl font-bold mb-2 text-center">Find Your Next Craving</h1>
      <p className='text-center '>Discover our full lineup of Chunk’d cookies — from classics to limited-edition drops.
        <br />
        Filter, search, and explore every flavor. Add your favourites to your box and build the perfect treat.
        </p>
    </div>
      <div className="flex flex-row justify-between items-center px-10 py-4 mb-8 gap-4">
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
  return cookie.status === "Sold Out" ? (
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
        <h2 className="text-xl font-semibold mb-1">{cookie.name}</h2>
        <p className="text-sm text-gray-500">Will Be Back Soon</p>
      </div>
    </div>
  ) : (
    <Link
        href={"/"}
      key={cookie.id}
      className="flex flex-col  justify-between border border-soft relative"
    >
      {/* Image Placeholder */}
      <div className="bg-soft/50 h-[400px] flex items-center justify-center text-gray-400 font-bold">
        Image
      </div>

      {/* Hot Seller Badge */}
      {cookie.hotSeller && (
        <div className="bg-white/50 text-sm font-semibold px-2 py-1 absolute top-5 left-5">
          🔥 Best Seller
        </div>
      )}

      {/* Cookie Info */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 >{cookie.name}</h2>
           <button
          onClick={() => handleAddToBox(cookie)}
          aria-label='add cookie to basket'
          className="mt-4 w-10  py-2 rounded-full font-semibold text-white bg-soft/80 hover:bg-soft transition z-40"
        >
          +
        </button>
          <h2 className="font-semibold text-lg md:text-xl">Rs.{cookie.price}</h2>
        </div>

      </div>
    </Link>
  );
})}

      </div>

      {/* Box Summary */}
      {box.length > 0 && (
        <div className="fixed bottom-5 right-5 bg-pink-600 text-white p-4 rounded-2xl shadow-lg w-64">
          <h3 className="font-bold mb-2">Your Box ({box.length})</h3>
          <ul className="text-sm">
            {box.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default MenuPage;
