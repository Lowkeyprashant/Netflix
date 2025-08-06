// src/app/auth/login/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen relative">
      {/* Background with Netflix movie grid pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd8d2d1c87f/web_tall_panel/IN-en-20231130-derow-perspective_alpha_website_large.jpg')`
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Header - Netflix Logo Only */}
      <header className="relative z-20 p-6 md:p-12">
        <Link href="/auth/signup">
          {/* Netflix Wordmark Logo */}
          <div className="text-red-600 font-black text-4xl tracking-tight hover:text-red-500 transition-colors">
            NETFLIX
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 -mt-20">
        <div className="w-full max-w-md">
          {/* Sign In Container - Premium Glass Effect */}
          <div className="bg-black/75 backdrop-blur-sm p-16 rounded-lg border border-white/10">
            <h1 className="text-white text-4xl font-bold mb-8">Sign In</h1>
            
            {message && (
              <div className="mb-6 p-4 bg-orange-600/90 text-white text-sm rounded-md">
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input - Floating Label Style */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full p-4 pt-6 bg-gray-700/90 backdrop-blur-sm border border-gray-600 rounded-md text-white text-base focus:bg-gray-600/90 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all placeholder-transparent"
                  placeholder="Email or mobile number"
                  required
                />
                <label 
                  htmlFor="email"
                  className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white peer-valid:top-2 peer-valid:text-xs peer-valid:text-white"
                >
                  Email or mobile number
                </label>
              </div>

              {/* Password Input - Floating Label Style */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full p-4 pt-6 bg-gray-700/90 backdrop-blur-sm border border-gray-600 rounded-md text-white text-base focus:bg-gray-600/90 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all placeholder-transparent"
                  placeholder="Password"
                  required
                />
                <label 
                  htmlFor="password"
                  className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white peer-valid:top-2 peer-valid:text-xs peer-valid:text-white"
                >
                  Password
                </label>
              </div>

              {/* Sign In Button - Premium Style */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-md text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : 'Sign In'}
              </button>

              {/* OR Divider */}
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative bg-black/75 px-4">
                  <span className="text-gray-400 font-medium">OR</span>
                </div>
              </div>

              {/* Sign-in Code Button */}
              <button
                type="button"
                className="w-full bg-gray-500/80 backdrop-blur-sm hover:bg-gray-500 text-white font-medium py-4 px-6 rounded-md text-base transition-all duration-200 transform hover:scale-[1.02]"
              >
                Use a sign-in code
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <a href="#" className="text-white hover:underline text-base hover:text-gray-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            </form>

            {/* Remember Me */}
            <div className="flex items-center mt-6">
              <div className="relative">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded border-2 cursor-pointer transition-all ${
                    rememberMe ? 'bg-white border-white' : 'border-gray-400 bg-transparent'
                  }`}
                >
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
            <div className="mt-8">
              <span className="text-gray-400 text-base">New to Netflix? </span>
              <Link href="/auth/signup" className="text-white hover:underline font-medium text-base hover:text-gray-300 transition-colors">
                Sign up now
              </Link>
              <span className="text-white">.</span>
            </div>

            {/* reCAPTCHA Notice */}
            <div className="mt-6 text-xs text-gray-500 leading-relaxed">
              <p>
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                <a href="#" className="text-blue-400 hover:underline">
                  Learn more
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-sm text-gray-400 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="mb-8 text-base">Questions? Call 000-800-919-1743 (Toll-Free)</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-4">
              <a href="#" className="block hover:underline transition-colors">FAQ</a>
              <a href="#" className="block hover:underline transition-colors">Cookie Preferences</a>
            </div>
            <div className="space-y-4">
              <a href="#" className="block hover:underline transition-colors">Help Centre</a>
              <a href="#" className="block hover:underline transition-colors">Corporate Information</a>
            </div>
            <div className="space-y-4">
              <a href="#" className="block hover:underline transition-colors">Terms of Use</a>
            </div>
            <div className="space-y-4">
              <a href="#" className="block hover:underline transition-colors">Privacy</a>
            </div>
          </div>

          <div className="mt-8">
            <select className="bg-black/60 backdrop-blur-sm border border-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20">
              <option>🌐 English</option>
              <option>🌐 हिन्दी</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}