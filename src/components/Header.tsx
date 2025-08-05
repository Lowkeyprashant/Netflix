// src/components/Header.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="focus:outline-none">
            <svg
              className="h-8 w-auto text-red-600 hover:text-red-500 transition-colors"
              viewBox="0 0 111 30"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M105.06 14.27L111 30c-1.75-.25-3.49-.58-5.24-.92l-3.79-8.92-3.79 8.92c-1.75.34-3.49.67-5.24.92l5.94-15.73L93.94 0h5.92l3.79 9.06L107.44 0h5.92l-8.3 14.27z"/>
              <path d="M90.97 0L85.06 0l-8.15 12.76L68.76 0l-5.91 0l8.15 12.76L62.85 30l5.91 0l8.15-12.76L85.06 30l5.91 0L82.82 17.24z"/>
              <path d="M42.64 0L37.73 0v18.43h15.67V14.27H42.64z"/>
              <path d="M21.4 18.25h13.94v4.18H21.4V30h-5.91V0h19.85v4.18H21.4z"/>
              <path d="M5.91 0v30H0V0z"/>
              <path d="M63.15 0v7.36c-1.05-1.05-2.28-1.86-3.7-2.44-1.41-.58-2.94-.87-4.58-.87-2.13 0-4.08.39-5.85 1.18s-3.3 1.89-4.58 3.31c-1.28 1.42-2.27 3.12-2.98 5.1-.71 1.98-1.06 4.15-1.06 6.51 0 2.36.35 4.53 1.06 6.51.71 1.98 1.7 3.68 2.98 5.1 1.28 1.42 2.81 2.52 4.58 3.31 1.77.79 3.72 1.18 5.85 1.18 1.64 0 3.17-.29 4.58-.87 1.42-.58 2.65-1.39 3.7-2.44V30h5.91V0h-5.91zm-5.91 22.69c-.92.96-2.04 1.44-3.36 1.44s-2.44-.48-3.36-1.44c-.92-.96-1.38-2.19-1.38-3.69s.46-2.73 1.38-3.69c.92-.96 2.04-1.44 3.36-1.44s2.44.48 3.36 1.44c.92.96 1.38 2.19 1.38 3.69s-.46 2.73-1.38 3.69z"/>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/tv-shows" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              TV Shows
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Movies
            </Link>
            <Link href="/new-popular" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              New & Popular
            </Link>
            <Link href="/my-list" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              My List
            </Link>
            <Link href="/browse-by-languages" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Browse by Languages
            </Link>
          </nav>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  className="bg-black/80 border border-white text-white px-4 py-2 pr-10 w-64 focus:outline-none focus:bg-black"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
                <svg className="absolute right-3 top-3 h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-gray-300 transition-colors p-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Kids */}
          <Link href="/kids" className="text-white hover:text-gray-300 transition-colors text-sm font-medium hidden md:block">
            Kids
          </Link>

          {/* Notifications */}
          <button className="text-white hover:text-gray-300 transition-colors p-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5m-5-8a7 7 0 1114 0v8" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              <img 
                src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfgBr1FLW5lOHqxF1W2A3T1VZz4jgw5QwJQ3j3qZ6Q.png?r=229" 
                alt="Profile"
                className="w-8 h-8 rounded"
              />
              <svg className={`w-4 h-4 transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg z-50">
                <div className="py-1">
                  <Link href="/profile" className="flex items-center px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                    <img 
                      src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfgBr1FLW5lOHqxF1W2A3T1VZz4jgw5QwJQ3j3qZ6Q.png?r=229" 
                      alt="Profile"
                      className="w-6 h-6 rounded mr-3"
                    />
                    Account
                  </Link>
                  <Link href="/help" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                    Help Center
                  </Link>
                  <hr className="border-gray-700 my-1" />
                  <Link href="/auth/login" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                    Sign out of Netflix
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white hover:text-gray-300 transition-colors p-2"
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
        <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-white hover:text-gray-300 transition-colors py-2">
              Home
            </Link>
            <Link href="/tv-shows" className="block text-white hover:text-gray-300 transition-colors py-2">
              TV Shows
            </Link>
            <Link href="/movies" className="block text-white hover:text-gray-300 transition-colors py-2">
              Movies
            </Link>
            <Link href="/new-popular" className="block text-white hover:text-gray-300 transition-colors py-2">
              New & Popular
            </Link>
            <Link href="/my-list" className="block text-white hover:text-gray-300 transition-colors py-2">
              My List
            </Link>
            <hr className="border-gray-700 my-3" />
            <Link href="/profile" className="block text-white hover:text-gray-300 transition-colors py-2">
              Account
            </Link>
            <Link href="/auth/login" className="block text-white hover:text-gray-300 transition-colors py-2">
              Sign Out
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}