// src/app/profiles/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKid: boolean;
}

export default function ProfilesPage() {
  const router = useRouter();
  
  const profiles: Profile[] = [
    {
      id: 'main',
      name: 'Main Profile',
      avatar: 'teal', // Teal Netflix logo avatar
      isKid: false
    },
    {
      id: 'profile2',
      name: 'Profile 2',
      avatar: 'green', // Green smiley avatar
      isKid: false
    },
    {
      id: 'profile3', 
      name: 'Profile 3',
      avatar: 'orange', // Orange smiley avatar
      isKid: false
    },
    {
      id: 'profile4',
      name: 'Profile 4', 
      avatar: 'person', // Person silhouette avatar
      isKid: false
    },
    {
      id: 'kids',
      name: 'Kids',
      avatar: 'kids', // Kids profile avatar
      isKid: true
    }
  ];

  const handleProfileSelect = (profileId: string) => {
    // Store selected profile and redirect to homepage
    localStorage.setItem('selectedProfile', profileId);
    router.push('/');
  };

  const getProfileAvatar = (profile: Profile) => {
    const avatarStyles = "w-full h-full flex items-center justify-center text-white font-bold text-6xl";
    
    switch (profile.avatar) {
      case 'teal':
        return (
          <div className="bg-teal-600 w-full h-full flex items-center justify-center relative">
            <svg className="w-20 h-20 text-white" viewBox="0 0 111 30" fill="currentColor">
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
          <div className="bg-green-600 w-full h-full flex items-center justify-center">
            {/* Green smiley face */}
            <div className="text-white">
              <div className="flex space-x-8 mb-4">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="w-16 h-8 border-b-4 border-white rounded-b-full"></div>
            </div>
          </div>
        );
      case 'orange':
        return (
          <div className="bg-orange-500 w-full h-full flex items-center justify-center">
            {/* Orange smiley face */}
            <div className="text-white">
              <div className="flex space-x-8 mb-4">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="w-16 h-8 border-b-4 border-white rounded-b-full"></div>
            </div>
          </div>
        );
      case 'person':
        return (
          <div className="bg-gray-700 w-full h-full flex items-center justify-center">
            {/* Person silhouette */}
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        );
      case 'kids':
        return (
          <div className="bg-white w-full h-full flex items-center justify-center border-4 border-gray-300">
            <div className="text-6xl font-black text-red-600 tracking-wider">KIDS</div>
          </div>
        );
      default:
        return <div className={`bg-red-600 ${avatarStyles}`}>😊</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-white text-6xl font-light mb-16">Who's watching?</h1>
        
        {/* Profile Grid */}
        <div className="flex justify-center items-center space-x-12 mb-16">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleProfileSelect(profile.id)}
              className="group cursor-pointer transition-all duration-300 hover:scale-110"
            >
              {/* Profile Avatar */}
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-lg overflow-hidden border-4 border-transparent group-hover:border-white transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                  {getProfileAvatar(profile)}
                </div>
              </div>
              
              {/* Profile Name */}
              <p className="text-gray-400 text-xl font-medium group-hover:text-white transition-colors duration-300">
                {profile.name}
              </p>
            </div>
          ))}
        </div>

        {/* Manage Profiles Button */}
        <button 
          onClick={() => router.push('/profiles/manage')}
          className="border border-gray-500 text-gray-400 hover:text-white hover:border-white px-10 py-3 text-xl font-medium tracking-wider transition-all duration-300 hover:bg-white/5"
        >
          MANAGE PROFILES
        </button>
      </div>
    </div>
  );
}