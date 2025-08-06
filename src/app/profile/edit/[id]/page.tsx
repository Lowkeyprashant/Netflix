// src/app/profiles/edit/[id]/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;
  
  const [profileName, setProfileName] = useState('Kran');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [maturityRating, setMaturityRating] = useState('All Maturity Ratings');
  const [autoplayNextEpisode, setAutoplayNextEpisode] = useState(true);
  const [autoplayPreviews, setAutoplayPreviews] = useState(true);

  const handleSave = () => {
    // Save profile changes
    console.log('Saving profile changes...');
    router.push('/profiles/manage');
  };

  const handleCancel = () => {
    router.push('/profiles/manage');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this profile?')) {
      // Delete profile logic
      router.push('/profiles/manage');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix Logo */}
      <div className="absolute top-8 left-8">
        <div className="text-red-600 font-black text-3xl tracking-tight">
          NETFLIX
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl px-8">
          <h1 className="text-6xl font-light mb-12 text-center">Edit Profile</h1>
          
          <div className="space-y-8">
            {/* Profile Avatar and Name */}
            <div className="flex items-start space-x-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
                  <img 
                    src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABWHATtw8N6Qe6BbJ-xEX4-lFdlrQzLd_1jF3wJKCB9GdL_7cF6eIwrZ7S6PCHS9_aHJPTCH9Yw.png?r=229"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Edit Icon */}
                <div className="absolute -bottom-2 -right-2 bg-black border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-800">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
              
              {/* Profile Settings */}
              <div className="flex-1 space-y-6">
                {/* Profile Name */}
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white text-xl focus:bg-gray-600 focus:outline-none focus:border-white"
                />
                
                {/* Language */}
                <div>
                  <label className="block text-gray-300 text-lg mb-2">Language:</label>
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white p-3 rounded focus:bg-gray-600 focus:outline-none focus:border-white"
                  >
                    <option value="">Select Language</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Maturity Settings */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Maturity Settings:</h2>
              
              <div className="bg-gray-800 p-6 rounded">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">{maturityRating}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Show titles of all maturity ratings for this profile.
                </p>
                <button className="border border-gray-500 text-gray-400 hover:text-white hover:border-white px-6 py-2 transition-colors">
                  Edit
                </button>
              </div>
            </div>

            {/* Autoplay Controls */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Autoplay controls</h2>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoplayNextEpisode}
                    onChange={(e) => setAutoplayNextEpisode(e.target.checked)}
                    className="w-5 h-5 text-white bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                  <span className="text-lg">Autoplay next episode in a series on all devices.</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoplayPreviews}
                    onChange={(e) => setAutoplayPreviews(e.target.checked)}
                    className="w-5 h-5 text-white bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                  <span className="text-lg">Autoplay previews whilst browsing on all devices.</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-8">
              <button
                onClick={handleSave}
                className="bg-white text-black font-bold px-8 py-3 text-lg hover:bg-gray-200 transition-colors"
              >
                Save
              </button>
              
              <button
                onClick={handleCancel}
                className="border border-gray-500 text-gray-400 hover:text-white hover:border-white px-8 py-3 text-lg transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={handleDelete}
                className="border border-gray-500 text-gray-400 hover:text-white hover:border-white px-8 py-3 text-lg transition-colors"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}