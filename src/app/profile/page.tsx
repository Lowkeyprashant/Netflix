// src/app/profile/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState('user@example.com'); // This would come from authentication

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Account</h1>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Membership & Billing</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-white">{userEmail}</p>
              </div>
              <button className="text-blue-500 hover:underline">Change</button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-400">Password</p>
                <p className="text-white">••••••••</p>
              </div>
              <button className="text-blue-500 hover:underline">Change</button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Plan Details</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-white font-bold">Premium</p>
                <p className="text-gray-400">Ultra HD, 4 screens</p>
              </div>
              <div className="text-right">
                <p className="text-white">₹649/month</p>
                <button className="text-blue-500 hover:underline">Change plan</button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Language</span>
                <select className="bg-gray-800 text-white px-3 py-2 rounded">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>Maturity rating</span>
                <span className="text-gray-400">All maturity ratings</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Autoplay controls</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold transition duration-300 mr-4">
              Sign out of all devices
            </button>
            <Link href="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded font-bold transition duration-300">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}