'use client';

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black mt-12 text-white pb-3 pt-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Chunk'd</h3>
          <p className="text-gray-300 mb-2">
            Freshly baked cookies delivered across Lahore. Choose your box, pick your flavours, and enjoy!
          </p>
        </div>

        {/* Delivery & Timing */}
        <div>
          <h3 className="text-xl font-bold mb-4">Delivery & Timing</h3>
          <p className="text-gray-300 mb-1">Delivery: 11:00 AM - 6:00 PM</p>
          <p className="text-gray-300 mb-1">Pickup Available</p>
          <p className="text-gray-300">Orders are baked fresh daily.</p>
        </div>

        {/* Socials & Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect with Us</h3>
          <div className="flex gap-4 mb-4">
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram size={22} className="hover:text-pink-500 transition"/>
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <FaFacebookF size={22} className="hover:text-pink-500 transition"/>
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FaTwitter size={22} className="hover:text-pink-500 transition"/>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/about" className="text-gray-300 hover:text-white transition">About Us</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition">Terms & Conditions</Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-200 text-sm">
        &copy; {year} Chunk'd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
