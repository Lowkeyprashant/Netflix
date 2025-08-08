// src/components/MovieRow.tsx

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

function MovieCard({ movie }: { movie: Movie }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;
  
  // Fallback poster if image fails to load
  const fallbackPoster = `https://via.placeholder.com/300x450/1f2937/ffffff?text=${encodeURIComponent(movie.title)}`;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle play functionality
    console.log('Play movie:', movie.title);
  };

  const handleAddToListClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle add to list functionality
    console.log('Add to list:', movie.title);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle like functionality
    console.log('Like movie:', movie.title);
  };

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle more info functionality
    console.log('More info:', movie.title);
  };

  return (
    <div 
      className="group relative min-w-0 flex-shrink-0 w-48 md:w-52 lg:w-56 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movie/${movie.id}`} aria-label={`View details for ${movie.title}`}>
        <div className="relative overflow-hidden rounded-lg bg-gray-800">
          {/* Poster Image */}
          <img
            src={imageError ? fallbackPoster : posterUrl}
            alt={`${movie.title} movie poster`}
            className={`w-full h-72 md:h-80 object-cover transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="text-gray-500 text-sm">Loading...</div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Title */}
              <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
                {movie.title}
              </h3>
              
              {/* Movie Info */}
              <div className="flex items-center justify-between text-xs text-gray-300 mb-3">
                <span className="bg-green-600 text-white px-2 py-1 rounded font-bold">
                  {Math.round(movie.vote_average * 10)}%
                </span>
                <span>
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePlayClick}
                  className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label={`Play ${movie.title}`}
                  title={`Play ${movie.title}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button 
                  onClick={handleAddToListClick}
                  className="bg-gray-600/70 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
                  aria-label={`Add ${movie.title} to my list`}
                  title={`Add ${movie.title} to my list`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button 
                  onClick={handleLikeClick}
                  className="bg-gray-600/70 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
                  aria-label={`Like ${movie.title}`}
                  title={`Like ${movie.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button 
                  onClick={handleMoreInfoClick}
                  className="bg-gray-600/70 text-white p-2 rounded-full hover:bg-gray-600 transition-colors ml-auto"
                  aria-label={`More information about ${movie.title}`}
                  title={`More information about ${movie.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Netflix Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded" aria-label="Netflix Original">N</span>
          </div>

          {/* HD Badge */}
          {movie.vote_average > 7 && (
            <div className="absolute top-2 right-2">
              <span className="bg-gray-800/80 text-white text-xs font-bold px-2 py-1 rounded" aria-label="High Definition">HD</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, [movies]);

  return (
    <div className="relative group/row py-8">
      <div className="container mx-auto px-4 md:px-16">
        {/* Section Title */}
        <h2 className="text-white text-xl md:text-2xl font-bold mb-4 group-hover/row:text-gray-300 transition-colors">
          {title}
        </h2>

        {/* Movies Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 bottom-0 z-10 bg-black/60 text-white p-2 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80 w-15"
              aria-label={`Scroll ${title} movies to the left`}
              title="Scroll left"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 bottom-0 z-10 bg-black/60 text-white p-2 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80 w-15"
              aria-label={`Scroll ${title} movies to the right`}
              title="Scroll right"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Movies Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide pb-4"
            role="list"
            aria-label={`${title} movies`}
          >
            {movies.map((movie) => (
              <div key={movie.id} role="listitem">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}