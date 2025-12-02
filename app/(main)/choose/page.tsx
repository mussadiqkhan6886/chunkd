'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function ChooseOrderPage() {
  return (
    <main className="min-h-screen bg-secondary flex flex-col pt-10 items-center justify-center p-6">
        <h1 className="sectionTitle">Start an Order</h1>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PRE-ORDER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft rounded-2xl shadow-md p-6 hover:shadow-xl transition border border-black"
        >
            <Link href={"/choose/pre-order"}>
          <div className="flex  items-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-100">
              {/* Pre-order Icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15 8H9L12 2ZM12 22L9 16H15L12 22ZM2 12L8 9V15L2 12ZM22 12L16 15V9L22 12Z"
                  fill="#D97706"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-800">Pre-Order</h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 text-sm">
            Reserve upcoming limited flavors before they launch. Perfect for exclusive drops.
          </p>

          {/* Image */}
          <div className="w-full h-40 rounded-xl flex items-center justify-center ">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.5">
              <path d="M12 6V12L15 15" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <h2 className="font-black text-4xl text-center">Pre-Order</h2>
</Link>
        
        </motion.div>

        {/* BUY NOW CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft rounded-2xl shadow-md p-6 hover:shadow-xl transition border border-black"
        >
          {/* Header */}
          <Link href={"/choose/buy-now"}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100">
              {/* Buy Now Icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5">
                <path
                  d="M3 3H6L8 14H18L21 6H9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="15" cy="18" r="1.5" />
                <circle cx="7" cy="18" r="1.5" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-800">Buy Now</h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 text-sm">
            Immediately order in-stock cookies and get them delivered quickly and fresh.
          </p>

          {/* Image */}
          <div className="w-full h-40 rounded-xl flex items-center justify-center ">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5">
              <path d="M3 3H6L8 14H18L21 6H9" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="15" cy="18" r="1.5" />
              <circle cx="7" cy="18" r="1.5" />
            </svg>
          </div>
            <h2 className="font-black text-4xl text-center">Buy Now</h2>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}