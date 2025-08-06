// src/app/profiles/manage/page.tsx

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

export default function ManageProfilesPage() {
  const router = useRouter();
  
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 'pk',
      name: 'PK',
      avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCELIeoNYsoKcrxTYWbFVCGg1IjYUJLnBvF-2m8bN4F3Q.png?r=229',
      isKid: false
    },
    {
      id: 'tia',
      name: 'Tia',
      avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfgBr1FLW5lOHqxF1W2A3T1VZz4jgw5QwJQ3j3qZ6Q.png?r=229',
      isKid: true
    },
    {
      id: 'kran',
      name: 'Kran',
      avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABWHATtw8N6Qe6BbJ-xEX4-lFdlrQzLd_1jF3wJKCB9GdL_7cF6eIwrZ7S6PCHS9_aHJPTCH9Yw.png?r=229',
      isKid: false
    },
    {
      id: 'spare',
      name: 'Spare',
      avatar: '',
      isKid: false
    },
    {
      id: 'pri',
      name: 'Pri',
      avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYKjXUelcnqxOqLQV1OyT-gvF-OMsJ7JT9hGhZdP1owKmjcJLCqf_eJxqGQ.png?r=229',
      isKid: false
    }
  ]);

  const handleEditProfile = (profileId: string) => {
    router.push(`/profiles/edit/${profileId}`);
  };

  const getProfileAvatar = (profile: Profile) => {
    switch (profile.id) {
      case 'pk':
        return (
          <div className="w-full h-full bg-teal-600 flex items-center justify-center">
            <svg className="w-16 h-16 text-white" viewBox="0 0 111 30" fill="currentColor">
              <path d="M105.06 14.27L111 30c-1.75-.25-3.49-.58-5.24-.92l-3.79-8.92-3.79 8.92c-1.75.34-3.49.67-5.24.92l5.94-15.73L93.94 0h5.92l3.79 9.06L107.44 0h5.92l-8.3 14.27z"/>
              <path d="M90.97 0L85.06 0l-8.15 12.76L68.76 0l-5.91 0l8.15 12.76L62.85 30l5.91 0l8.15-12.76L85.06 30l5.91 0L82.82 17.24z"/>
              <path d="M42.64 0L37.73 0v18.43h15.67V14.27H42.64z"/>
              <path d="M21.4 18.25h13.94v4.18H21.4V30h-5.91V0h19.85v4.18H21.4z"/>
              <path d="M5.91 0v30H0V0z"/>
            </svg>
          </div>
        );
      case 'tia':
        return (
          <div className="w-full h-full bg-green-600 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="flex justify-center space-x-6 mb-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-12 h-6 border-b-3 border-white rounded-b-full mx-auto"></div>
            </div>
          </div>
        );
      case 'kran':
        return (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        );
      case 'spare':
        return (
          <div className="w-full h-full bg-red-600 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="flex justify-center space-x-6 mb-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-12 h-2 bg-white mx-auto"></div>
            </div>
          </div>
        );
      case 'pri':
        return (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-4xl">
            👤
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix Logo */}
      <div className="absolute top-6 left-6">
        <svg className="h-10 w-auto text-red-600" viewBox="0 0 111 30" fill="currentColor">
          <path d="M105.06 14.27L111 30c-1.75-.25-3.49-.58-5.24-.92l-3.79-8.92-3.79 8.92c-1.75.34-3.49.67-5.24.92l5.94-15.73L93.94 0h5.92l3.79 9.06L107.44 0h5.92l-8.3 14.27z"/>
          <path d="M90.97 0L85.06 0l-8.15 12.76L68.76 0l-5.91 0l8.15 12.76L62.85 30l5.91 0l8.15-12.76L85.06 30l5.91 0L82.82 17.24z"/>
          <path d="M42.64 0L37.73 0v18.43h15.67V14.27H42.64z"/>
          <path d="M21.4 18.25h13.94v4.18H21.4V30h-5.91V0h19.85v4.18H21.4z"/>
          <path d="M5.91 0v30H0V0z"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-light mb-12">Manage Profiles:</h1>
          
          {/* Profile Grid */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => handleEditProfile(profile.id)}
                className="group cursor-pointer transition-transform hover:scale-105 relative"
              >
                {/* Profile Avatar with Edit Icon */}
                <div className="relative mb-4">
                  <div className="w-40 h-40 rounded-lg overflow-hidden border-4 border-transparent group-hover:border-white transition-all duration-200 relative">
                    {getProfileAvatar(profile)}
                    
                    {/* Edit Pencil Icon Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Profile Name */}
                <p className="text-gray-400 text-xl font-medium group-hover:text-white transition-colors">
                  {profile.name}
                </p>
              </div>
            ))}
          </div>

          {/* Done Button */}
          <button 
            onClick={() => router.push('/profiles')}
            className="bg-white text-black font-bold px-12 py-3 text-xl hover:bg-gray-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}