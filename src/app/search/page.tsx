// src/app/search/page.tsx

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

function MovieCard({ movie }: { movie: Movie }) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-card">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className="movie-poster"
      />
      <div className="p-4">
        <h3 className="movie-title text-white font-bold mb-2">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-2">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        <p className="text-yellow-400 text-sm">★ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  const searchMovies = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`;

    try {
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }

      const data = await response.json();
      setMovies(data.results.filter((movie: Movie) => movie.poster_path));
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search movies. Please try again.');
      // Fallback data
      setMovies([
        { id: 763212, title: 'Lift', poster_path: '/gma8o1jWaSc6c31p94I1p2h53M6.jpg', overview: 'Action movie', release_date: '2024-01-10', vote_average: 6.5 },
        { id: 609681, title: 'The Marvels', poster_path: '/9c693wV39Gq0fV0G5pB9G49L9m7.jpg', overview: 'Superhero movie', release_date: '2023-11-10', vote_average: 7.2 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {query && (
        <h1 className="page-title">Search Results for: "{query}"</h1>
      )}
      
      {loading && <p className="text-center text-white">Searching...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      ) : (
        !loading && query && (
          <p className="text-center text-gray-400 mt-8">
            No movies found for "{query}". Try a different search term.
          </p>
        )
      )}
    </div>
  );
}

export default function SearchPage() {
  const handleSearch = (query: string) => {
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container py-8">
        <SearchBar onSearch={handleSearch} />
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  );
}