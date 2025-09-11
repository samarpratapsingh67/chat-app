"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserButton } from '@clerk/nextjs';
import { Home, MessageSquare } from 'lucide-react';
import Link from 'next/link'; // <-- Import Link

// NavLink component now uses Link
const NavLink = ({ href, children }) => {
    return (
        <Link href={href} className="relative px-3 py-2 text-green-200/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
            {children}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#84cc16] to-[#10b981]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: 'center' }}
            />
        </Link>
    );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0c1a14]/80 backdrop-blur-lg border-b border-emerald-900 shadow-2xl shadow-black/30 px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-[#84cc16] to-[#10b981] bg-clip-text text-transparent">
          SparkTalk
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center space-x-1">
            <NavLink href="/"><Home size={16}/><span>Home</span></NavLink>
            <NavLink href="/forums"><MessageSquare size={16}/><span>Forums</span></NavLink>
          </div>
          <div className="border-l border-emerald-800 h-6"></div>
          <UserButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button 
            onClick={toggleMenu} 
            className="text-green-200/80 hover:text-lime-400 focus:outline-none z-50"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-4 flex flex-col space-y-2 px-2 pb-3">
              <Link href="/" className="block text-green-200/80 hover:text-white px-4 py-3 rounded-md bg-green-900/40">Home</Link>
              <Link href="/forums" className="block text-green-200/80 hover:text-white px-4 py-3 rounded-md bg-green-900/40">Forums</Link>
              
              <div className='border-t border-emerald-900 mt-4 pt-4 flex items-center gap-4 px-4'>
                  <UserButton showName />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
