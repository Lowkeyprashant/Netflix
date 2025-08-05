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
  
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
  const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`;

  // Fallback backdrop if image fails to load
  const fallbackBackdrop = 'https://images.unsplash.com/photo-1489599856485-9808886a33ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80';

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageError ? fallbackBackdrop : backdropUrl}
          alt={movie.title}
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-16">
          <div className="max-w-2xl">
            {/* Netflix Original Badge */}
            <div className="flex items-center mb-4">
              <svg className="h-6 w-auto text-red-600 mr-3" viewBox="0 0 111 30" fill="currentColor">
                <path d="M105.06 14.27L111 30c-1.75-.25-3.49-.58-5.24-.92l-3.79-8.92-3.79 8.92c-1.75.34-3.49.67-5.24.92l5.94-15.73L93.94 0h5.92l3.79 9.06L107.44 0h5.92l-8.3 14.27z"/>
                <path d="M90.97 0L85.06 0l-8.15 12.76L68.76 0l-5.91 0l8.15 12.76L62.85 30l5.91 0l8.15-12.76L85.06 30l5.91 0L82.82 17.24z"/>
                <path d="M42.64 0L37.73 0v18.43h15.67V14.27H42.64z"/>
                <path d="M21.4 18.25h13.94v4.18H21.4V30h-5.91V0h19.85v4.18H21.4z"/>
                <path d="M5.91 0v30H0V0z"/>
              </svg>
              <span className="text-white font-bold text-sm tracking-widest">SERIES</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            {/* Movie Info */}
            <div className="flex items-center space-x-4 mb-6 text-white">
              <span className="bg-red-600 px-2 py-1 text-sm font-bold">HD</span>
              <span className="text-green-500 font-bold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span className="text-gray-300">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="border border-gray-400 px-2 py-1 text-xs font-bold">
                13+
              </span>
            </div>

            {/* Overview */}
            <p className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-xl line-clamp-3">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center bg-white text-black font-bold py-3 px-8 rounded hover:bg-gray-200 transition-colors group">
                <svg className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play
              </button>
              
              <Link href={`/movie/${movie.id}`}>
                <button className="flex items-center justify-center bg-gray-600/70 backdrop-blur text-white font-bold py-3 px-8 rounded hover:bg-gray-600 transition-colors group">
                  <svg className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  More Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sound Toggle */}
      <div className="absolute bottom-24 right-4 md:right-16">
        <button className="bg-transparent border-2 border-white/50 text-white p-3 rounded-full hover:border-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10h4l4.553-4.276A1 1 0 0116 6.618v10.764a1 1 0 01-1.447.894L10 14H6a2 2 0 01-2-2v-2a2 2 0 012-2z" />
          </svg>
        </button>
      </div>

      {/* Age Rating Info */}
      <div className="absolute bottom-24 left-4 md:left-16 bg-gray-800/80 backdrop-blur px-4 py-2 rounded text-white text-sm">
        <div className="flex items-center space-x-2">
          <span className="border border-gray-400 px-2 py-1 text-xs font-bold">13+</span>
          <span>Contains: Violence, Language</span>
        </div>
      </div>
    </div>
  );
}