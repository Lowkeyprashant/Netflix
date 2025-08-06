// src/app/account/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  maturityRating: string;
}

export default function AccountPage() {
  const [profiles] = useState<Profile[]>([
    {
      id: 'pk',
      name: 'PK',
      avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCELIeoNYsoKcrxTYWbFVCGg1IjYUJLnBvF-2m8bN4F3Q.png?r=229',
      maturityRating: 'All Maturity Ratings'
    },
    {
      id: 'tia',
      name: 'Tia',
      avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfgBr1FLW5lOHqxF1W2A3T1VZz4jgw5QwJQ3j3qZ6Q.png?r=229',
      maturityRating: 'PG and below'
    },
    {
      id: 'kran',
      name: 'Kran',
      avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABWHATtw8N6Qe6BbJ-xEX4-lFdlrQzLd_1jF3wJKCB9GdL_7cF6eIwrZ7S6PCHS9_aHJPTCH9Yw.png?r=229',
      maturityRating: 'All Maturity Ratings'
    },
    {
      id: 'spare',
      name: 'Spare',
      avatar: '',
      maturityRating: 'All Maturity Ratings'
    },
    {
      id: 'pri',
      name: 'Pri',
      avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYKjXUelcnqxOqLQV1OyT-gvF-OMsJ7JT9hGhZdP1owKmjcJLCqf_eJxqGQ.png?r=229',
      maturityRating: '15 and below'
    }
  ]);

  const getProfileAvatar = (profile: Profile) => {
    if (profile.avatar) {
      return <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />;
    }
    return <div className="w-full h-full bg-red-600 flex items-center justify-center text-white text-2xl">😠</div>;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <svg className="h-8 w-auto text-red-600" viewBox="0 0 111 30" fill="currentColor">
              <path d="M105.06 14.27L111 30c-1.75-.25-3.49-.58-5.24-.92l-3.79-8.92-3.79 8.92c-1.75.34-3.49.67-5.24.92l5.94-15.73L93.94 0h5.92l3.79 9.06L107.44 0h5.92l-8.3 14.27z"/>
              <path d="M90.97 0L85.06 0l-8.15 12.76L68.76 0l-5.91 0l8.15 12.76L62.85 30l5.91 0l8.15-12.76L85.06 30l5.91 0L82.82 17.24z"/>
              <path d="M42.64 0L37.73 0v18.43h15.67V14.27H42.64z"/>
              <path d="M21.4 18.25h13.94v4.18H21.4V30h-5.91V0h19.85v4.18H21.4z"/>
              <path d="M5.91 0v30H0V0z"/>
            </svg>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded">
              <img 
                src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCELIeoNYsoKcrxTYWbFVCGg1IjYUJLnBvF-2m8bN4F3Q.png?r=229"
                alt="Profile"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-4xl font-bold">Account</h1>
          <div className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            MEMBER SINCE 2019
          </div>
        </div>

        {/* Membership & Billing Section */}
        <section className="mb-12">
          <div className="border-b border-gray-300 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-600 mb-4">MEMBERSHIP & BILLING</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">member@example.com</div>
                  <div className="text-gray-600 text-sm">Password: ••••••••</div>
                </div>
                <div className="text-blue-600 space-y-1 text-right">
                  <a href="#" className="block hover:underline text-sm">Change account email</a>
                  <a href="#" className="block hover:underline text-sm">Change password</a>
                  <a href="#" className="block hover:underline text-sm">Add phone number</a>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="font-semibold text-gray-600">Subscriptions Charges</div>
                <div className="text-sm text-gray-600">
                  Your next billing date is January 29, 2024. We will automatically charge...
                  <br />Your subscription will begin and your first payment...
                </div>
                <a href="#" className="text-blue-600 hover:underline text-sm">▼ Billing details</a>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-2">Premium</div>
              <div className="text-2xl font-bold">₹649</div>
              <div className="text-sm text-gray-600 mb-4">4 screens • 4K • HDR • Download to 6 devices</div>
              <a href="#" className="text-blue-600 hover:underline">Change plan</a>
            </div>
          </div>
        </section>

        {/* Plan Details Section */}
        <section className="mb-12">
          <div className="border-b border-gray-300 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-600">PLAN DETAILS</h2>
          </div>
          <div className="text-gray-600">Premium</div>
        </section>

        {/* Profile & Parental Controls Section */}
        <section className="mb-12">
          <div className="border-b border-gray-300 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-600">PROFILE & PARENTAL CONTROLS</h2>
          </div>
          
          <div className="space-y-4">
            {profiles.map((profile) => (
              <div key={profile.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      {getProfileAvatar(profile)}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{profile.name}</div>
                      <div className="text-gray-600 text-sm">{profile.maturityRating}</div>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Settings Section */}
        <section>
          <div className="border-b border-gray-300 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-600">SETTINGS</h2>
          </div>
          
          <div className="space-y-3 text-blue-600">
            <a href="#" className="block hover:underline">Test participation</a>
            <a href="#" className="block hover:underline">Manage download devices</a>
            <a href="#" className="block hover:underline">Recent device streaming activity</a>
            <a href="#" className="block hover:underline">Sign out of all devices</a>
            <a href="#" className="block hover:underline">Download your personal information</a>
          </div>
        </section>
      </main>
    </div>
  );
}