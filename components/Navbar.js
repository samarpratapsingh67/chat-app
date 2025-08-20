"use client"
import { UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10 shadow-xl p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          SparkTalk
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <a href="/" className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300">Home</a>
          <a href="/forums" className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300">Forums</a>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none z-50">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-4 space-y-2 px-4 pb-4">
                <a href="/" className="block text-gray-300 hover:text-white px-4 py-2 rounded-md bg-black/20">Home</a>
                <a href="/forums" className="block text-gray-300 hover:text-white px-4 py-2 rounded-md bg-black/20">Forums</a>
                <div className='px-4 py-2'><UserButton afterSignOutUrl="/" /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;