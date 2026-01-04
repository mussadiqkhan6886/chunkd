'use client';

import Image from 'next/image'
import React, { useState } from 'react'


const Subscribe = () => {
     const [email, setEmail] = useState('');
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Subscribed with ${email}!`);
        setEmail('');
      };
    
  return (
    <section className="max-w-7xl mx-auto mt-10 p-5 md:p-10 text-center rounded-3xl bg-black relative overflow-hidden">
          {/* Decorative Stars */}
          <Image className="z-20 absolute top-5 left-10" src="/star1.svg" alt="star" width={70} height={70} />
          <Image className="z-20 absolute top-10 right-0" src="/star2.svg" alt="star" width={140} height={140} />
          <Image className="z-20 absolute bottom-20 right-0" src="/star1.svg" alt="star" width={40} height={40} />
          <Image className="z-20 absolute bottom-20 left-30" src="/star2.svg" alt="star" width={50} height={50} />
    
          {/* Newsletter content with gradient border */}
          <div className="relative rounded-2xl p-[1px] border-2 border-transparent bg-clip-padding bg-gradient-to-r from-white via-pink-500 to-pink-400">
            <div className="bg-black rounded-[14px] p-6">
              <h3 className="sectionTitle mb-2 z-40 uppercase bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">
                Join the Chunk'd Drop List
              </h3>
              <p className="mb-6 text-lg bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">
                Be the first to know when new flavours go live. No spam, just cravings
              </p>
    
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="p-3 rounded-md border border-soft focus:outline-none focus:ring-2 focus:ring-pink-400 w-full md:w-[330px] sm:w-[400px] placeholder:text-white text-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-soft text-black px-6 py-3 rounded-md font-semibold transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
  )
}

export default Subscribe
