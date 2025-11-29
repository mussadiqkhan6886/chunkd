'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/lib/constants';
import {FiMenu, FiX} from "react-icons/fi"

const HeaderWithMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-around items-center  transition-colors duration-300 ${
        scrolled ? 'bg-soft' : 'bg-transparent'
      }`}
    >
      {/* Left: Menu Icon */}
      <button
        className="font-semibold text-3xl text-black"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <FiMenu />
      </button>
      <div></div>

      {/* Middle: Logo */}
      <div className="flex-shrink-0">
        <Image src="/logo.png" alt="Logo" width={80} height={40} />
      </div>

      <div></div>
      {/* Right: CTA */}
      <AnimatePresence>
      {scrolled ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: 'easeOut', delay:0.3 }}
        >
          <Link
            href="/menu"
            className="orderButtonStyle "
          >
            Order 
          </Link>
        </motion.div>
      ): <div className='w-[75px]'></div>}
    </AnimatePresence>

      {/* Aside Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 left-0 w-80 h-full bg-secondary  z-40 p-6 flex flex-col"
          >
            <nav className="flex flex-col gap-4 mt-10">
              {menuItems.map(item => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="text-2xl capitalize font-medium hover:text-soft transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 bg-opacity-30 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderWithMenu;
