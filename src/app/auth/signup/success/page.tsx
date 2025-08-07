// src/app/auth/signup/success/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupSuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign in after 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/auth/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleSignInNow = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Netflix Logo - Bigger for Success Page */}
        <div className="mb-8">
          <img 
            src="/images/netflix-logo.png" 
            alt="Netflix" 
            className="h-12 md:h-16 w-auto mx-auto"
          />
        </div>

        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-400">
            🎉 Congratulations!
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Your Netflix signup is complete!
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
            Welcome to Netflix! Your account has been successfully created and your subscription is now active.
          </p>
          <p className="text-base md:text-lg text-gray-400">
            Get ready to dive into unlimited movies, TV shows, documentaries, and Netflix Originals.
          </p>
        </div>

        {/* What's Included */}
        <div className="mb-8 text-left max-w-lg mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">What's included in your membership:</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="text-lg">Unlimited streaming on all your devices</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="text-lg">Download shows to watch offline</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="text-lg">No ads, no commitments, cancel anytime</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="text-lg">Access to Netflix Originals & exclusives</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6">
          <button
            onClick={handleSignInNow}
            className="w-full max-w-md mx-auto bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 block"
          >
            Start Watching Now →
          </button>
          
          <div className="bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-300">Auto-redirecting in {countdown} seconds...</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Help Link */}
        <div className="mt-12 text-gray-400 text-sm">
          <p>
            Need help getting started? Visit our{' '}
            <Link href="#" className="text-red-400 hover:underline">
              Help Center
            </Link>{' '}
            or{' '}
            <Link href="#" className="text-red-400 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>

        {/* Celebration Effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="animate-bounce absolute top-20 left-10 text-2xl">🎊</div>
          <div className="animate-bounce absolute top-32 right-10 text-2xl" style={{ animationDelay: '0.5s' }}>🎉</div>
          <div className="animate-bounce absolute top-40 left-20 text-2xl" style={{ animationDelay: '1s' }}>✨</div>
          <div className="animate-bounce absolute top-48 right-20 text-2xl" style={{ animationDelay: '1.5s' }}>🍿</div>
        </div>
      </div>
    </div>
  );
}