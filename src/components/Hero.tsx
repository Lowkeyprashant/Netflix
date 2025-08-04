// src/components/Hero.tsx

import React from 'react';

interface Movie {
  title: string;
  overview: string;
  backdrop_path: string;
}

interface HeroProps {
  movie: Movie;
}

export default function Hero({ movie }: HeroProps) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

  return (
    <div 
      className="hero-container"
      style={{ backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})` }}
    >
      <div className="hero-overlay">
        <div className="container hero-content">
          <h2 className="hero-title">{movie.title}</h2>
          <p className="hero-overview">{movie.overview}</p>
          <div className="hero-buttons">
            <button className="hero-button">Play</button>
            <button className="hero-button secondary">My List</button>
          </div>
        </div>
      </div>
    </div>
  );
}