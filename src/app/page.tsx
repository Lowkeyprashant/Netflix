// src/app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow'; // <-- New import here

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

interface MovieList {
  title: string;
  movies: Movie[];
}

export default function Home() {
  const [movieLists, setMovieLists] = useState<MovieList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

      try {
        const [popularRes, topRatedRes] = await Promise.all([
          fetch(popularUrl),
          fetch(topRatedUrl)
        ]);

        if (!popularRes.ok || !topRatedRes.ok) {
          throw new Error('Failed to fetch movie data');
        }

        const popularData = await popularRes.json();
        const topRatedData = await topRatedRes.json();

        setMovieLists([
          { title: "Popular Movies", movies: popularData.results },
          { title: "Top Rated", movies: topRatedData.results },
        ]);
        setError(null);

      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError("Could not fetch movies. Displaying hardcoded data.");
        // Fallback to hardcoded data if API call fails
        setMovieLists([
          { title: "Popular Movies", movies: [
            { id: 763212, title: 'Lift', poster_path: '/gma8o1jWaSc6c31p94I1p2h53M6.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "" },
            { id: 609681, title: 'The Marvels', poster_path: '/9c693wV39Gq0fV0G5pB9G49L9m7.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "" },
            { id: 872585, title: 'Oppenheimer', poster_path: '/h2n9H9fC5Fq9R0Y1xW5Xl1Q2dYQ.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P2dYQ.jpg', overview: "" },
          ]},
          { title: "Top Rated", movies: [
            { id: 458156, title: 'John Wick: Chapter 3 - Parabellum', poster_path: '/udDclOQ75otK1j9nKglx9f3s.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "" },
            { id: 299534, title: 'Avengers: Endgame', poster_path: '/or06FN3Dka5tukK1e9slAcn9zJl.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "" },
            { id: 420817, title: 'Aladdin', poster_path: '/3iYQcrbbPUezgq7Lefz1kQ8L0Lp.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "" },
          ]},
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieLists.length === 0 && !isLoading) {
      fetchMovieData();
    }
  }, [movieLists, isLoading]);

  const featuredMovie = movieLists.length > 0 ? movieLists[0].movies[0] : null;

  return (
    <main>
      {featuredMovie && <Hero movie={featuredMovie} />}
      <div className="container">
        <SearchBar onSearch={(query) => console.log(query)} />
        {error && <p className="text-center my-4 text-red-500">{error}</p>}
        {isLoading && <p className="text-center my-4">Loading movies...</p>}
        
        {movieLists.map((list) => (
          <MovieRow key={list.title} title={list.title} movies={list.movies} />
        ))}
      </div>
    </main>
  );
}