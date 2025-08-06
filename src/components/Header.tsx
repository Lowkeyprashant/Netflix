// src/components/Header.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const router = useRouter();

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

  const handleSignOut = () => {
    localStorage.removeItem('selectedProfile');
    router.push('/auth/login');
  };

  const profiles = [
    { id: 'main', name: 'PK', avatar: 'teal' },
    { id: 'profile2', name: 'Tia', avatar: 'green' },
    { id: 'profile3', name: 'Spare', avatar: 'red' },
    { id: 'profile4', name: 'Pri', avatar: 'blue' }
  ];

  const getAvatarComponent = (avatarType: string, size: string = 'w-8 h-8') => {
    switch (avatarType) {
      case 'teal':
        return (
          <div className={`${size} bg-teal-600 rounded flex items-center justify-center`}>
            <svg className="w-4 h-4 text-white" viewBox="0 0 111 30" fill="currentColor">
              <path d="M105.06 14.27L111 30c-1.75-.25-3.49-.58-5.24-.92l-3.79-8.92-3.79 8.92c-1.75.34-3.49.67-5.24.92l5.94-15.73L93.94 0h5.92l3.79 9.06L107.44 0h5.92l-8.3 14.27z"/>
              <path d="M90.97 0L85.06 0l-8.15 12.76L68.76 0l-5.91 0l8.15 12.76L62.85 30l5.91 0l8.15-12.76L85.06 30l5.91 0L82.82 17.24z"/>
              <path d="M42.64 0L37.73 0v18.43h15.67V14.27H42.64z"/>
              <path d="M21.4 18.25h13.94v4.18H21.4V30h-5.91V0h19.85v4.18H21.4z"/>
              <path d="M5.91 0v30H0V0z"/>
            </svg>
          </div>
        );
      case 'green':
        return (
          <div className={`${size} bg-green-600 rounded flex items-center justify-center text-white`}>
            <div className="text-xs">😊</div>
          </div>
        );
      case 'red':
        return (
          <div className={`${size} bg-red-600 rounded flex items-center justify-center text-white`}>
            <div className="text-xs">😠</div>
          </div>
        );
      case 'blue':
        return (
          <div className={`${size} bg-blue-600 rounded flex items-center justify-center text-white`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${size} bg-gray-600 rounded flex items-center justify-center text-white text-xs`}>
            U
          </div>
        );
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="focus:outline-none">
            {/* Netflix Wordmark Logo */}
            <div className="text-red-600 font-black text-2xl tracking-tight hover:text-red-500 transition-colors">
              NETFLIX
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/tv-shows" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Series
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Films
            </Link>
            <Link href="/new-popular" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              New & Popular
            </Link>
            <Link href="/my-list" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              My List
            </Link>
            <Link href="/browse-languages" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
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
                  className="bg-black/80 border border-white text-white px-4 py-2 pr-10 w-64 focus:outline-none focus:bg-black transition-all"
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

          {/* Children */}
          <Link href="/kids" className="text-white hover:text-gray-300 transition-colors text-sm font-medium hidden md:block">
            Children
          </Link>

          {/* Notifications */}
          <button className="text-white hover:text-gray-300 transition-colors p-2 relative">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5m0-8a7 7 0 1114 0v8" />
            </svg>
            {/* Notification dot */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></div>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              {getAvatarComponent('teal')}
              <svg className={`w-4 h-4 transform transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-md shadow-2xl overflow-hidden">
                {/* Profile List */}
                <div className="py-2">
                  {profiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => {
                        localStorage.setItem('selectedProfile', profile.id);
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-800/50 transition-colors"
                    >
                      {getAvatarComponent(profile.avatar)}
                      <span className="ml-3 text-sm">{profile.name}</span>
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <hr className="border-gray-700" />

                {/* Menu Options */}
                <div className="py-2">
                  <Link 
                    href="/profiles/manage"
                    className="flex items-center px-4 py-2 text-white hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span className="text-sm">Manage Profiles</span>
                  </Link>

                  <Link 
                    href="/account"
                    className="flex items-center px-4 py-2 text-white hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">Account</span>
                  </Link>

                  <Link 
                    href="/help"
                    className="flex items-center px-4 py-2 text-white hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Help Centre</span>
                  </Link>
                </div>

                {/* Divider */}
                <hr className="border-gray-700" />

                {/* Sign Out */}
                <div className="py-2">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-800/50 transition-colors text-center"
                  >
                    <span className="text-sm mx-auto">Sign out of Netflix</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white hover:text-gray-300 transition-colors p-2"
            onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMainMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-white hover:text-gray-300 transition-colors py-2">
              Home
            </Link>
            <Link href="/tv-shows" className="block text-white hover:text-gray-300 transition-colors py-2">
              Series
            </Link>
            <Link href="/movies" className="block text-white hover:text-gray-300 transition-colors py-2">
              Films
            </Link>
            <Link href="/new-popular" className="block text-white hover:text-gray-300 transition-colors py-2">
              New & Popular
            </Link>
            <Link href="/my-list" className="block text-white hover:text-gray-300 transition-colors py-2">
              My List
            </Link>
            <Link href="/browse-languages" className="block text-white hover:text-gray-300 transition-colors py-2">
              Browse by Languages
            </Link>
            <hr className="border-gray-700 my-3" />
            <Link href="/profiles/manage" className="block text-white hover:text-gray-300 transition-colors py-2">
              Manage Profiles
            </Link>
            <Link href="/account" className="block text-white hover:text-gray-300 transition-colors py-2">
              Account
            </Link>
            <button
              onClick={handleSignOut}
              className="block text-white hover:text-gray-300 transition-colors py-2 w-full text-left"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}