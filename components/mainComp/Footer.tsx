'use client';

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-soft/10 border-t border-soft mt-12 text-black pb-3 pt-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Chunk'd</h3>
          <p className="text-gray-900 mb-2">
            Freshly baked cookies delivered across Lahore. Choose your box, pick your flavours, and enjoy!
          </p>
        </div>

        {/* Delivery & Timing */}
        <div>
          <h3 className="text-xl font-bold mb-4">Delivery & Timing</h3>
          <p className="text-gray-900 mb-1">Delivery: 11:00 AM - 6:00 PM</p>
          <p className="text-gray-900 mb-1">Pickup Available</p>
          <p className="text-gray-900">Orders are baked fresh daily.</p>
        </div>

        {/* Socials & Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect with Us</h3>
          <div className="flex gap-4 mb-4">
            <Link aria-label='instagram link' href="https://www.instagram.com/chunkd.pk/?__pwa=1" target="_blank">
              <FaInstagram aria-label='instagram icon' name='instagram icon'  size={22} className="hover:text-pink-500 transition"/>
            </Link>
            <Link aria-label='facebook link' href="https://www.facebook.com/profile.php?id=61580610550539" target="_blank">
              <FaFacebookF name='facebook icon' aria-label='facebook icon' size={22} className="hover:text-pink-500 transition"/>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/contact" className="text-gray-900 hover:text-black transition">Contact</Link>
            <Link href="/policies/#return" className="text-gray-900 hover:text-black transition">Return and Refund</Link>
            <Link href="/policies/#terms" className="text-gray-900 hover:text-black transition">Terms & Conditions</Link>
            <Link href="/policies/#privacy" className="text-gray-900 hover:text-black transition">Privacy Policy</Link>
            <Link href="/policies/#shipping" className="text-gray-900 hover:text-black transition">Delivery & shipping</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-800 text-sm">
        &copy; {year} Chunk'd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
