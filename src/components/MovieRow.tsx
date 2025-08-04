// src/components/MovieRow.tsx

import React from 'react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

// We'll reuse the MovieCard component here
function MovieCard({ movie }: { movie: Movie }) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-card-row">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className="movie-poster"
      />
    </div>
  );
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <div className="movie-row-container">
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row-scroller">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}