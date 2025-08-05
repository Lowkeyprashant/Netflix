// src/components/Header.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <div className="logo">STREAMIFYY</div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-white hover:text-gray-300 transition-colors">
              Browse
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <Link href="/search">
            <button className="text-white hover:text-gray-300 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-sm font-bold">U</span>
              </div>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg z-50">
                <div className="py-1">
                  <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Account
                  </Link>
                  <Link href="/auth/login" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="container py-4 space-y-2">
            <Link href="/" className="block text-white hover:text-gray-300 py-2">
              Home
            </Link>
            <Link href="/search" className="block text-white hover:text-gray-300 py-2">
              Browse
            </Link>
            <Link href="/profile" className="block text-white hover:text-gray-300 py-2">
              Account
            </Link>
            <Link href="/auth/login" className="block text-white hover:text-gray-300 py-2">
              Sign Out
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}