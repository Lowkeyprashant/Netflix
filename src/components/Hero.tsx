// src/components/Hero.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface HeroProps {
  movie: Movie;
}

export default function Hero({ movie }: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // Use Snow White & The Huntsman backdrop for exact match
  const backdropUrl = 'https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd8d2d1c87f/web_tall_panel/IN-en-20231130-derow-perspective_alpha_website_large.jpg';
  const fallbackBackdrop = 'https://images.unsplash.com/photo-1489599856485-9808886a33ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80';

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageError ? fallbackBackdrop : backdropUrl}
          alt="Snow White & The Huntsman"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-16">
          <div className="max-w-2xl">
            {/* Movie Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight">
                SNOW WHITE
                <br />
                <span className="text-4xl md:text-6xl lg:text-7xl">& THE</span>
                <br />
                <span className="text-5xl md:text-7xl lg:text-8xl">HUNTSMAN</span>
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center bg-white text-black font-bold py-4 px-12 rounded text-xl hover:bg-gray-200 transition-colors group">
                <svg className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play
              </button>
              
              <Link href={`/movie/${movie.id}`}>
                <button className="flex items-center justify-center bg-gray-600/70 backdrop-blur text-white font-bold py-4 px-12 rounded text-xl hover:bg-gray-600 transition-colors group">
                  <svg className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  More Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sound Toggle (Bottom Right) */}
      <div className="absolute bottom-32 right-4 md:right-16">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="bg-transparent border-2 border-white/70 text-white p-3 rounded-full hover:border-white hover:bg-white/10 transition-all group"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10h4l4.553-4.276A1 1 0 0116 6.618v10.764a1 1 0 01-1.447.894L10 14H6a2 2 0 01-2-2v-2a2 2 0 012-2z" />
            </svg>
          )}
        </button>
      </div>

      {/* Maturity Rating Badge (Bottom Right) */}
      <div className="absolute bottom-32 right-20 md:right-32">
        <div className="bg-gray-800/80 backdrop-blur px-4 py-2 rounded text-white text-base font-semibold flex items-center">
          <div className="bg-orange-600 text-white px-2 py-1 text-sm font-bold rounded mr-3">
            12
          </div>
          <span className="text-sm">Violence, Dark Themes</span>
        </div>
      </div>

      {/* Fade to Black Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}