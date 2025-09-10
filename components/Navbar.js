"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock UserButton component to resolve the import error
const UserButton = () => {
    return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-lime-500"></div>
    );
};

// A helper component for creating nav links with a cool animated underline
const NavLink = ({ href, children }) => {
    return (
        <a href={href} className="relative px-3 py-2 text-green-200/80 hover:text-white transition-colors duration-300">
            {children}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#84cc16] to-[#10b981]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: 'center' }}
            />
        </a>
    );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0c1a14]/80 backdrop-blur-lg border-b border-emerald-900 shadow-2xl shadow-black/30 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-[#84cc16] to-[#10b981] bg-clip-text text-transparent">
          SparkTalk
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-2 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/forums">Forums</NavLink>
            <div className="pl-4">
                <UserButton />
            </div>
        </div>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden flex items-center">
          <motion.button 
            onClick={toggleMenu} 
            className="text-green-200/80 hover:text-lime-400 focus:outline-none z-50"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="mt-4 flex flex-col space-y-2 px-2 pb-3">
                <a href="/" className="block text-green-200/80 hover:text-white px-4 py-2 rounded-md bg-green-900/40">Home</a>
                <a href="/forums" className="block text-green-200/80 hover:text-white px-4 py-2 rounded-md bg-green-900/40">Forums</a>
                <div className='px-4 py-2'><UserButton /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

