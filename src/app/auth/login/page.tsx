// src/app/auth/login/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate login - in real app, call your API
    setTimeout(() => {
      if (email && password) {
        // Successful login - redirect directly to homepage
        router.push('/');
      } else {
        setMessage('Please enter valid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/netflix-background.jpg')"
        }}
        role="img"
        aria-label="Netflix background with movie thumbnails"
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Header with Custom Netflix Logo */}
      <header className="relative z-20 p-6 md:p-8">
        <Link href="/">
          <div className="inline-block">
            <Image 
              src="/images/netflix-logo.png"
              alt="Netflix"
              width={592}
              height={160}
              priority
              className="h-32 md:h-40 w-auto cursor-pointer hover:opacity-80 transition-opacity bg-transparent"
            />
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 -mt-20">
        <div className="w-full max-w-md">
          {/* Sign In Container - Enhanced Glass Effect */}
          <div className="bg-black/60 backdrop-blur-md p-12 md:p-16 rounded-lg border border-white/5 shadow-2xl">
            <h1 className="text-white text-3xl md:text-4xl font-medium mb-8">Sign In</h1>
            
            {message && (
              <div className="mb-6 p-4 bg-orange-600/80 text-white text-sm rounded-md backdrop-blur-sm">
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full p-4 pt-6 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-md text-white text-base focus:bg-gray-700/60 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all placeholder-transparent"
                  placeholder="Email or mobile number"
                  required
                  aria-label="Email or mobile number"
                />
                <label 
                  htmlFor="email"
                  className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white peer-valid:top-2 peer-valid:text-xs peer-valid:text-white pointer-events-none"
                >
                  Email or mobile number
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full p-4 pt-6 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-md text-white text-base focus:bg-gray-700/60 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all placeholder-transparent"
                  placeholder="Password"
                  required
                  aria-label="Password"
                />
                <label 
                  htmlFor="password"
                  className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white peer-valid:top-2 peer-valid:text-xs peer-valid:text-white pointer-events-none"
                >
                  Password
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-4 px-6 rounded-md text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : 'Sign In'}
              </button>

              {/* OR Divider */}
              <div className="relative text-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50"></div>
                </div>
                <div className="relative bg-transparent px-4">
                  <span className="text-gray-400 text-base">OR</span>
                </div>
              </div>

              {/* Sign-in Code Button */}
              <button
                type="button"
                className="w-full bg-gray-600/40 backdrop-blur-sm hover:bg-gray-500/60 text-white font-medium py-4 px-6 rounded-md text-base transition-all duration-200 border border-gray-600/30"
              >
                Use a sign-in code
              </button>

              {/* Forgot Password */}
              <div className="text-center mt-6">
                <Link href="#" className="text-white hover:underline text-base hover:text-gray-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </form>

            {/* Remember Me */}
            <div className="flex items-center mt-8">
              <div className="relative">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-2 cursor-pointer transition-all bg-gray-800/50 border-gray-600/50 text-red-600 focus:ring-white/30 focus:ring-1"
                />
                <div className="hidden">
                  {rememberMe && (
                    <svg className="w-3 h-3 text-black m-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <label htmlFor="rememberMe" className="ml-3 text-gray-300 text-base cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6">
              <span className="text-gray-400 text-base">New to Netflix? </span>
              <Link href="/auth/signup" className="text-white hover:underline font-medium text-base hover:text-gray-300 transition-colors">
                Sign up now
              </Link>
              <span className="text-gray-400">.</span>
            </div>

            {/* reCAPTCHA Notice */}
            <div className="mt-4 text-xs text-gray-500 leading-relaxed">
              <p>
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                <Link href="#" className="text-blue-400 hover:underline">
                  Learn more
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/70 backdrop-blur-sm text-gray-400 py-8 px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          <p className="mb-6 text-base">Questions? Call 000-800-919-1743 (Toll-Free)</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-3">
              <Link href="#" className="block hover:underline transition-colors">FAQ</Link>
              <Link href="#" className="block hover:underline transition-colors">Cookie Preferences</Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline transition-colors">Help Centre</Link>
              <Link href="#" className="block hover:underline transition-colors">Corporate Information</Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline transition-colors">Terms of Use</Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline transition-colors">Privacy</Link>
            </div>
          </div>

          <div className="mt-6">
            <select 
              className="bg-black/60 backdrop-blur-sm border border-gray-600/50 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
              aria-label="Select language"
            >
              <option value="en">🌐 English</option>
              <option value="hi">🌐 हिन्दी</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}